def add_time(start, duration, day=''):

    dayList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    
    startTime, startUnit = start.split()
    startHour, startMin = startTime.split(':')
    endHour, endMin = duration.split(':')

    startHour = int(startHour)
    startMin = int(startMin)
    endHour = int(endHour)
    endMin = int(endMin)
    timeUnit = startUnit

    timeHour = startHour + endHour
    timeMin = startMin + endMin
    days = 0

    if (timeMin >= 60):
      timeHour += (timeMin // 60)
      timeMin %= 60

    if (timeHour > 24):
      days += (timeHour // 24)
      timeHour %= 24

    if (timeHour >= 12):
      if (timeUnit == 'AM'):
        timeUnit = 'PM'
      elif (timeUnit == 'PM'):
        timeUnit = 'AM'
        days += 1
      
      if (timeHour > 12):
        timeHour %= 12

    if (day):
      day = day.lower().capitalize()
      indexDay = dayList.index(day)
      sumDay = indexDay + days

      if (sumDay >= 7):
        sumDay %= 7
      day = dayList[sumDay]

      timeUnit += ', ' + day

    if (days >= 1):
      if (days == 1):
        timeUnit += ' (next day)'
      else:
        timeUnit += ' (' + str(days) + ' days later)'

    time = str(timeHour) + ':' + str(timeMin).zfill(2) + ' ' + timeUnit
      
    return time