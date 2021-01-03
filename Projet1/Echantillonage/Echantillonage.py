from math import exp,tan

def main():
    x = 0.6 #nb échantillons
    o = 0.01 #rugosité
    tan2 = tan(x)*tan(x)
    o2 = o*o
    e = exp(-tan2/o2)
    print(1-e)

main()
