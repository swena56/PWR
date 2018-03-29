#!/usr/bin/python

import threading
import time
import signal
import sys

exitFlag = 0

class myThread (threading.Thread):
   def __init__(self, threadID, name, counter):
      threading.Thread.__init__(self)
      self.threadID = threadID
      self.name = name
      self.counter = counter
   def run(self):
      print "Starting " + self.name
      print_time(self.name, 9, self.counter)
      print "Exiting " + self.name

def signal_handler(signal, frame):
        print('You pressed Ctrl+C!')
        sys.exit(0)

def print_time(threadName, counter, delay):
   while counter:
	      if exitFlag:
        	 threadName.exit()
	      time.sleep(delay)
      	      print "%s: %s" % (threadName, time.ctime(time.time()))
	      counter -= 1


if __name__ == '__main__':
    try:
	thread1 = myThread(1, "Thread-1", 5)
	thread1.deamon = True
	thread1.start()
    except KeyboardInterrupt:
        exitFlat = 1
    finally:
        sys.exit()
