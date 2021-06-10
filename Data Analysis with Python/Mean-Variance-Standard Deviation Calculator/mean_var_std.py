import numpy as np

def calculate(list):

    if (len(list) < 9):
      raise ValueError("List must contain nine numbers.") 
      return list
    
    myArray = np.array(list, dtype=float).reshape(3, 3)

    return {
      'mean': [np.mean(myArray, axis=0).tolist(), np.mean(myArray, axis=1).tolist(), np.mean(myArray).tolist()],
      'variance': [np.var(myArray, axis=0).tolist(), np.var(myArray, axis=1).tolist(), np.var(myArray).tolist()],
      'standard deviation': [np.std(myArray, axis=0).tolist(), np.std(myArray, axis=1).tolist(), np.std(myArray).tolist()],
      'max': [np.amax(myArray, axis=0).tolist(), np.amax(myArray, axis=1).tolist(), np.amax(myArray).tolist()],
      'min': [np.amin(myArray, axis=0).tolist(), np.amin(myArray, axis=1).tolist(), np.amin(myArray).tolist()],
      'sum': [np.sum(myArray, axis=0).tolist(), np.sum(myArray, axis=1).tolist(), np.sum(myArray).tolist()]
    }