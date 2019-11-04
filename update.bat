@ECHO OFF


call:runPrograma languagesJSON call download.bat

call:runPrograma cardsNames replaceCardsNameTxt.py

call:runPrograma jsBeautiful replaceOnTemplate.py

call:runPrograma jsFinal BonitoParaURL.py

call:runPrograma jsToHtml jsToHtml.py

copy jsToHtml\*.htm leobastiani.github.io\HSTranslate /y

echo Envie para o servidor manualmente!

pause


:runPrograma
	:: rode um programa passando a pasta e o nome dele
	pushd %1
	%2 %3 %4 %5 %6 %7 %8 %9
	popd
goto:eof
