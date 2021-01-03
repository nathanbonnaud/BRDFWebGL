
from math import exp,tan

#code de test pour l'echantillonage d'importance

def cdf(x):
    o = 0.01 #rugosité
    tan2 = tan(x)*tan(x)
    o2 = o*o
    e = exp(-tan2/o2)
    print(1-e)

def cdfInverse(x):
    print(1/cdf(x))

cdfInverse(500)
