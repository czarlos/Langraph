from github3 import GitHub
from github3 import login
import github3
import getpass
import sys
import csv

dataDict = {}
user = raw_input("Enter Username: ")
passw = getpass.getpass("Enter Password: ")
gh = login(user, password=passw)
percentageDict = {}

#makes dictionary of languages to number of lines
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

def makeTab():
	f = open("langData.tsv", "w")
	writer = csv.writer(f, delimiter = '\t')
	for key, value in percentageDict.iteritems():
		writer.writerow([key] + [value])


if __name__ == '__main__':
	readGihubData()
	makePercentageDict()
	makeTab()
	for key in dataDict.iterkeys():
		print key
		for x in range(1,int(20*percentageDict[key])):
			sys.stdout.write("&")
		print "\n"
