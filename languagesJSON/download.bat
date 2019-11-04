:: Faz o download do JSON de todas as linguas
call:baixarArquivoPorIdioma deDE
call:baixarArquivoPorIdioma enUS
call:baixarArquivoPorIdioma esES
call:baixarArquivoPorIdioma esMX
call:baixarArquivoPorIdioma frFR
call:baixarArquivoPorIdioma itIT
call:baixarArquivoPorIdioma jaJP
call:baixarArquivoPorIdioma koKR
call:baixarArquivoPorIdioma plPL
call:baixarArquivoPorIdioma ptBR
call:baixarArquivoPorIdioma ruRU
call:baixarArquivoPorIdioma thTH
call:baixarArquivoPorIdioma zhCN
call:baixarArquivoPorIdioma zhTW


:: executa seus parametros
echo Continue assim que todos os downloads acabarem
pause

goto:eof



:: %1 eh o idioma do arquivo, exemplo:
::   ptBR
:: Pasta de saida eh essa mesma
:baixarArquivoPorIdioma
	echo wget -N --content-disposition https://api.hearthstonejson.com/v1/latest/%1/cards.json -O AllSets.%1.json
	wget -N --content-disposition https://api.hearthstonejson.com/v1/latest/%1/cards.json -O AllSets.%1.json
goto:eof
