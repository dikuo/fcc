def arithmetic_arranger(problems, isSolve = False):

    if (len(problems) > 5):
      return 'Error: Too many problems.'

    arranged_problems = ''
    line1 = '' #first operand
    line2 = '' #operator and second operand
    line3 = '' #seperator
    line4 = '' #result

    for problem in problems:
      problemEle = problem.split()
      num1, operator, num2 = problemEle

      if (operator != '+' and operator != '-'):
        return "Error: Operator must be '+' or '-'."
      if (not num1.isdecimal() or not num2.isdecimal()):
        return 'Error: Numbers must only contain digits.'
      if (len(num1) > 4 or len(num2) > 4):
        return 'Error: Numbers cannot be more than four digits.'


      if (len(num1) >= len(num2)):
        largerLen = len(num1)
        smallerLen = len(num2)

        line1 += ' ' * 2 + num1 + ' ' * 4
        line2 += operator + ' ' * (1 + largerLen - smallerLen) + num2 + ' ' * 4
        line3 += '-' * (largerLen + 2) + ' ' * 4

      else:
        largerLen = len(num2)
        smallerLen = len(num1)

        line1 += ' ' * (2 + largerLen - smallerLen) + num1 + ' ' * 4
        line2 += operator + ' ' + num2 + ' ' * 4
        line3 += '-' * (largerLen + 2) + ' ' * 4

      if (isSolve):
        result = str(eval(problem))
        line4 += ' ' * (largerLen + 2 - len(result)) + result + ' ' * 4

    arranged_problems += line1.rstrip() + '\n' + line2.rstrip() + '\n' + line3.rstrip()
    if (isSolve):
      arranged_problems += '\n' + line4.rstrip()

    return arranged_problems