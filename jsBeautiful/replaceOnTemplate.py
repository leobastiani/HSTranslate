#!python3

# nesse script, eu troco a palavra JSON_CARDS_NAME no arquivo hstradutorTemplate.js
# pelo conteúdo em cards_name.txt
import re
import sys
sys.path.append('../')

def getFile(fileLng):
    return '../cardsNames/'+fileLng+'.txt'

from allLanguages import allLanguages


for language in allLanguages:

    print('Trocando do template de: '+language)

    cardsNameTxt = getFile(language)
    templateFilePath = '../hstradutorTemplate.js'


    with open(cardsNameTxt, 'r', encoding='utf-8') as file:
        cardsNameTxtContent = file.read()

    with open(templateFilePath, 'r', encoding='utf-8') as file:
        templateContent = file.read()


    # salva o resultado no arquivo final para o chrome
    fileFinal = language+'.js'



    # troca o conteúdo
    chromeContent = re.sub('JSON_CARDS_NAME', cardsNameTxtContent, templateContent, count=1)


    with open(fileFinal, 'w', encoding='utf-8') as file:
        file.write(chromeContent)
