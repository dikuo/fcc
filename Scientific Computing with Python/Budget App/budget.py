class Category:

  def __init__(self, name):
    self.name = name
    self.ledger = []
    self.amount = 0
    self.totalDeposit = 0
    self.totalWithdraw = 0

  def deposit(self, amount, description = ''):
    self.totalDeposit += amount
    self.amount += amount
    self.ledger.append({"amount": amount, "description": description})

  def withdraw(self, amount, description = ''):

    if (self.check_funds(amount)):
      self.totalWithdraw += amount
      self.amount -= amount

      self.ledger.append({"amount": 0 - amount, "description": description})
      return True
    else:
      return False

  def get_balance(self):
    return self.amount

  def transfer(self, amount, category):
    if (self.withdraw(amount, description = 'Transfer to ' + category.name)):
      category.deposit(amount, description = 'Transfer from ' + self.name)
      return True
    
    return False

  def check_funds(self, amount):
    return self.amount >= amount if True else False
  
  def __str__(self):
    head = self.name.center(30, '*') + '\n'
    line = ''

    for activity in self.ledger:
      line += activity['description'][:23].ljust(23) + ' {:.2f}'.format(activity['amount']) +'\n'

    end = 'Total: {:.2f}'.format(self.amount)
    
    output = head + line + end
    return output

def create_spend_chart(categories):

  head = 'Percentage spent by category\n'

  sumWithdrawList = []
  categoryNameList = []
  for category in categories:
    sumWithdrawList.append(category.totalWithdraw)
    categoryNameList.append(category.name)

  sumWithdraw = sum(sumWithdrawList)
  sumWithdrawList = list(map(lambda x: round((x / sumWithdraw) * 100), sumWithdrawList))

  lines = head
  startScore = 100

  while (startScore >= 0):

    lines += str(startScore).rjust(3) + '| '

    for score in sumWithdrawList:
      if (score >= startScore):
        lines += 'o'
      else:
        lines += ' '
        
      lines += '  '
    
    lines += '\n'
    startScore -= 10

  separtorLen = len(categories) * 3 + 1
  separtor = (separtorLen * '-').rjust(separtorLen + 4)

  lines += separtor

  maxNameLen = max([len(w) for w in categoryNameList])

  nameLines = ''

  for i in range(maxNameLen):
    
    nameLines += '\n'
    nameLines += ' ' * 5

    for name in categoryNameList:
      try:
        nameLines += name[i]
      except IndexError:
        nameLines += ' '
      
      nameLines += ' ' * 2

  lines += nameLines

  return lines


