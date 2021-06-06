import copy
import random
# Consider using the modules imported above.

class Hat:

  def __init__(self, **kwargs):
    self.contents = []
    
    for k,v in kwargs.items():
      for i in range(v):
        self.contents.append(k)

    self.contents_copy = copy.copy(self.contents)

  def draw(self, numDraw):
    drawList = []
    
    self.contents = copy.copy(self.contents_copy)

    if (numDraw > len(self.contents)):
      return self.contents

    for i in range(numDraw):
      draw_a_ball = random.choice(self.contents)
      self.contents.remove(draw_a_ball)
      drawList.append(draw_a_ball)
 
    return drawList

def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
  
  matchCount = 0

  for i in range(num_experiments):
    drawList = hat.draw(num_balls_drawn)
    drawDict = listToDict(drawList)
    
    isMatch = True
    for key in expected_balls:
      try:
        if (drawDict[key] < expected_balls[key]):
          isMatch = False
          break
      except KeyError:
        isMatch = False
        break
    
    if (isMatch):
      matchCount += 1

  return matchCount / num_experiments

def listToDict(list):
  dict = {}
  for item in list:
    if (item in dict):
      dict[item] += 1
    else:
      dict[item] = 1

  return dict


