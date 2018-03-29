from HTMLParser import HTMLParser

# create a subclass and override the handler methods
class MyHTMLParser(HTMLParser):
    def handle_starttag(self, tag, attrs):
	if tag == "td":
        	print "Encountered a start tag:", tag
	else:
		print "Blank"

    def handle_endtag(self, tag):
        print "Encountered an end tag :", tag

    def handle_data(self, data):
        print "Encountered some data  :", data

# instantiate the parser and fed it some HTML
parser = MyHTMLParser()
parser.feed('<td class="dxgv" align="center">1953</td><td class="dxgv" align="center">2018-02-27#344598</td><td class="dxgv" align="center">2/27/2018 3:00:00 PM</td><td class="dxgv" align="center">9528368733</td><td class="dxgv" align="center">1600 OAK ST</td><td class="dxgv" align="center">$74.37</td><td class="dxgv" align="center">Complete</td><td class="dxgv" align="center">Phone</td><td class="dxgv" align="center">Delivery</td><td class="dxgv" align="center">DEREK (7649)</td><td class="dxgv" align="center">DEREK (7649)</td><td class="dxgv" align="center">1 12SCREEN Pepperoni1 12SCREEN Pepperoni1 12SCREEN Pepperoni1 12SCREEN Pepperoni1 12SCREEN Pepperoni1 12SCREEN Sausage1 12SCREEN Sausage1 12SCREEN Sausage1 12SCREEN Sausage1 12SCREEN Sausage1 12SCREEN1 12SCREEN</td>')
#parser.feed('<html><head><title>Test</title></head>'
#            '<body><h1>Parse me!</h1></body></html>')
