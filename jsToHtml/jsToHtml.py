#!python3

# Transforma o js bonito para url
import re
import sys
sys.path.append('../')

def getFile(fileLng):
    return '../jsFinal/'+fileLng+'.js'

from allLanguages import allLanguages

for language in allLanguages:

    print('Exportando para HTML: '+language)
    with open(getFile(language), 'r', encoding='utf-8') as file:
        fileContent = file.read()

    fileContent = re.sub(r'\&', '&amp;', fileContent)
    fileContent = re.sub(r'\<', '&lt;', fileContent)
    fileContent = re.sub(r'\>', '&gt;', fileContent)

    with open(language+'.htm', 'w', encoding='utf-8') as file:
        file.write('<meta charset="utf-8"><pre>'+fileContent+'</pre>')
