import urllib3
import json

http = urllib3.PoolManager()

def fetch_definition(word: str):
    r = http.request("GET", f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}")
    r_json = json.loads(r.data.decode('utf-8'))
    return parse_def_json(r_json)

def parse_def_json(json_data):
    # meanings = []
    # for pos in json_data:
    #     meanings.append(pos["meanings"])
    
    # return meanings
    return json_data