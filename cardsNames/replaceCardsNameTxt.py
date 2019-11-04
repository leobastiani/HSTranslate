#!python3
# coding=utf-8
import json
import sys
sys.path.append('../')

def getFile(fileLng):
    return '../languagesJSON/AllSets.'+fileLng+'.json'

from allLanguages import allLanguages

for language in allLanguages:
    print('CardsName de: '+language)

    cards = {language: None, 'enUS': None}
    try:
        with open(getFile(language), 'r', encoding='utf-8') as file:
            cards[language] = json.load(file)
    except:
        # nao conseguiu ler o json
        # que pena :/
        print('Erro em: '+language)
        continue

    with open(getFile('enUS'), 'r', encoding='utf-8') as file:
        cards['enUS'] = json.load(file)



    result = {}




    def searchCard(id, obj):
        for carta in obj:
            if carta.get('id') == id:
                return carta['name']
        raise Exception('Erro, id não encontrado')




    def porCard(obj):
        for carta in obj:

            # deve ser desse tipo
            if carta.get('type') not in ['SPELL', 'MINION', 'WEAPON']:
                continue
            # deve ter uma raridade
            if 'rarity' not in carta:
                continue

            yield carta['id'], carta['name']




    for id, cardEn in porCard(cards['enUS']):
        nomePt = searchCard(id, cards[language])
        if nomePt:
            result[cardEn] = nomePt



    with open(language+'.txt', 'w', encoding='utf8') as file:
        json.dump(result, file, ensure_ascii=False)
