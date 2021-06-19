import pandas as pd
import matplotlib.pyplot as plt
from scipy.stats import linregress

def draw_plot():
    # Read data from file
    df = pd.read_csv('epa-sea-level.csv')
    x = df['Year']
    y = df['CSIRO Adjusted Sea Level']
    # Create scatter plot
    fig, ax = plt.subplots()
    plt.scatter(x, y, alpha=0.3)

    # Create first line of best fit
    res = linregress(x, y)
    x_pred = pd.Series([i for i in range(1880, 2051)])
    y_pred = res.slope * x_pred + res.intercept
    plt.plot(x_pred, y_pred, 'r')

    # Create second line of best fit
    df2 = df[df['Year'] >= 2000]
    df2_x = df2['Year']
    df2_y = df2['CSIRO Adjusted Sea Level']
    df2_res = linregress(df2_x, df2_y)
    df2_xpred = pd.Series([i for i in range(2000, 2051)])
    df2_ypred = df2_res.slope * df2_xpred + df2_res.intercept
    plt.plot(df2_xpred, df2_ypred, 'g')

    # Add labels and title
    ax.set_title("Rise in Sea Level")
    ax.set_xlabel('Year')
    ax.set_ylabel('Sea Level (inches)')
    
    # Save plot and return data for testing (DO NOT MODIFY)
    plt.savefig('sea_level_plot.png')
    return plt.gca()