#!python3

# Transforma o js bonito para url
import re
import sys
sys.path.append('../')

def getFile(fileLng):
    return '../jsBeautiful/'+fileLng+'.js'

from allLanguages import allLanguages


for language in allLanguages:
    print('Transformando para URL: '+language)

    with open(getFile(language), 'r', encoding='utf-8') as file:
        fileContent = file.read()

    fileContent = re.sub(r'\/\/([^\n]*)?', r'/*\1*/', fileContent) # troca comentarios de uma linha
    fileContent = re.sub(r'\}\n', '};\n', fileContent) # coloca um ponto e vírgula no final da funcao
    fileContent = re.sub(r'\n(\t+)', r'\1', fileContent) # troca as quebras de linhas acompanhadas de \t
    fileContent = re.sub(r'\t', '/*t*/', fileContent) # infelizmente, o favorito nao grava \t
    fileContent = re.sub(r'\n', '/*br*/', fileContent) # troca as quebras de linha que nao foram trocadas na linha anterior

    with open(language+'.js', 'w', encoding='utf-8') as file:
        file.write('javascript: '+fileContent)
