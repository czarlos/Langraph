#Python Github wrapper imports
from github3 import GitHub
from github3 import login
import github3
import getpass
import sys
import csv

#Mongo imports
import pymongo
from pymongo import MongoClient
import datetime

user = raw_input("Enter Username: ")
passw = getpass.getpass("Enter Password: ")
gh = login(user, password=passw)
percentageDict = {}
dataDict = {}

#client = MongoClient()
#db = client.language_database

def readGihubData():
	for repo in gh.iter_user_repos(user):
		for lang in repo.iter_languages():
			if lang[0] != "ETag" and lang[0] != "Last-Modified" :
				dataDict[str(lang[0])] = lang[1]

def calculateTotalCodeAmount():
	codeLinesTotal = 0
	for value in dataDict.itervalues():
		codeLinesTotal += value
	return codeLinesTotal

def makePercentageDict():
	for key in dataDict.iterkeys():
		keyVal = float(dataDict[key])
		total = float(calculateTotalCodeAmount())
		result = keyVal/total
		percentageDict[key] = 100*result

def graphResults():
	resultsDict = {}
	resultsDict["Other"] = 0
	for key in percentageDict.iterkeys():
		if percentageDict[key] < 2:
			resultsDict["Other"] = resultsDict["Other"]+percentageDict[key]
		else:
			resultsDict[key] = percentageDict[key]
	return resultsDict;

def makeTab():
	f = open("langData.tsv", "w")
	writer = csv.writer(f, delimiter = '\t')
	writer.writerow(["name"] + ["value"])
	for key, value in graphResults().iteritems():
		writer.writerow([key] + [value])

def insertGraphData():
	db.graph_collection.insert(graphResults())

if __name__ == '__main__':
	readGihubData()
	makePercentageDict()
	makeTab()
#	insertGraphData()
