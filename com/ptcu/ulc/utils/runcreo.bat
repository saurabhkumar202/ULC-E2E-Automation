echo|set /p=%DATE% %TIME% >> creorun.log 
taskkill /F /IM creoagent.exe >> creorun.log 2>&1
echo|set /p=%DATE% %TIME% >> creorun.log
taskkill /F /IM creoagent.exe >> creorun.log 2>&1
echo|set /p=%DATE% %TIME% >> creorun.log
taskkill /F /IM nmsd.exe >> creorun.log 2>&1
echo|set /p=%DATE% %TIME% >> creorun.log
taskkill /F /IM xtop.exe >> creorun.log 2>&1
echo|set /p=%DATE% %TIME% >> creorun.log
taskkill /F /IM learning_conn.exe >> creorun.log 2>&1
echo %DATE% %TIME% starting creo from %CREO_BIN% >> creorun.log
cd %CREO_BIN%
start "" parametric.exe