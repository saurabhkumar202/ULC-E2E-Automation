#cs ----------------------------------------------------------------------------

 AutoIt Version: 3.3.14.2
 Author:         bgupta

 Script Function:
	Template AutoIt script.

#ce ----------------------------------------------------------------------------

; Script Start - Add your code below here
; Note : Creo Browser should be IE only
; Note : Please set CREO_BIN variable with bin folder path of Creo parametric

#include <Debug.au3>
#include <File.au3>
#include <IE.au3>
#include <MsgBoxConstants.au3>
#include <StringConstants.au3>

; --- Run Creo ----
Local $sRunCreoBatPath = _PathFull( @ScriptDir & "\runcreo.bat")
ConsoleWrite("bat path -> " & $sRunCreoBatPath & @CRLF)
Run($sRunCreoBatPath)
Sleep(6000)

;$sCreoBinPath = EnvGet("CREO_BIN")
;ConsoleWrite("binary path -> " & $sCreoBinPath & @CRLF)
;Run($sCreoBinPath)
; --- Close all the windows ----
If WinWaitActive("Resource Center") Then
	WinClose("Resource Center")
ElseIf WinWaitActive("New to Creo Parametric?")Then
	WinClose ("New to Creo Parametric?")
	ConsolWrite("Debugging" & @CRLF)
EndIf
Sleep(6000)

; --- Launch ULC from Creo Parametric --------
Send("{ALT}{NUMPAD3}")
Send("{DOWN}{ENTER}")
Send("{TAB 3}")
Send("{DOWN}{ENTER}")
Sleep(6000)

; --- Attach ULC IE ----
Local $oLC = _IEAttach("PTC Learning Connector", "embedded")
; ConsoleWrite('@@ Debug(' & @ScriptLineNumber & ') : $oLC = ' & $oLC & @CRLF & '>Error code: ' & @error & '    Extended code: 0x' & Hex(@extended) & @CRLF) ;### Debug Console

; Search form is the first form in LC
Local $oSearchForm = _IEFormGetCollection($oLC,0)
; ConsoleWrite('@@ Debug(' & @ScriptLineNumber & ') : $oLC = ' & $oSearchForm & @CRLF & '>Error code: ' & @error & '    Extended code: 0x' & Hex(@extended) & @CRLF) ;### Debug Console


; ---- Login with precisionautomation ----
ULCLogin("precisionautomation","ptcse1")

; ----Use Case 1: Send and Verify Command from Creo on LC -----------
WinActivate("Creo Parametric")
Send("{ALT}F")
Send("N")
Send("{ENTER}")
Sleep(5000)

If (StringInStr (_IEPropertyGet($oLC, "locationurl"), 'ProCmdModelNewExe') <> 0) Then
   ConsoleWrite("Use Case 1). Send and Verify Command on LC --> Passed" & @CRLF)
Else
   ConsoleWrite("Use Case 1). Send and Verify Command on LC --> Failed" & @CRLF)
EndIf

; ----Use Case 2: Search with Creo ----------------------------
Local $oSeachInput = _IEFormElementGetCollection($oSearchForm,1)
Local $oSearchButton = _IEFormElementGetCollection($oSearchForm,2)

WinActivate("PTC Learning Connector")
_IEAction($oSearchButton, "click")
_IEAction($oSeachInput, "focus")
Send("Creo{ENTER}")

Local $oMainContent = _IEGetObjById($oLC,"mainContent")
Local $oSearchKeyword = _IETagNameGetCollection($oMainContent,"H1",0)
If "Creo" == _IEPropertyGet($oSearchKeyword,"innertext") Then
   ConsoleWrite("Use Case 2). Search --> " & "Passed" & @CRLF)
Else
   ConsoleWrite("Use Case 2). Search --> " & "Failed" & @CRLF)
EndIf


; ---- Login function ----
Func ULCLogin (ByRef $sUserName,ByRef $sPassword)
   WinActivate("PTC Learning Connector")
   Local $oSignInModal = _IEGetObjById($oLC,"signInAction")
   _IEAction($oSignInModal,"click")

   Local $oUserNameIp = _IEGetObjById($oLC,"lgUsername")
   _IEAction($oUserNameIp,"focus")
   Send($sUserName)

   Local $oPasswordIp = _IEGetObjById($oLC,"lgPassword")
   _IEAction($oPasswordIp,"focus")
   Send($sPassword)

   Local $oLoginBtn = _IEGetObjById($oLC,"loginSubmit")
   _IEAction($oLoginBtn,"click")
   Sleep(15000)
EndFunc
