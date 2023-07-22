import pickle
import json
import numpy as np
import warnings

__data_columns = None
__model = None

def get_estimated_price(location,sqft,bhk,bath):
    warnings.filterwarnings("ignore", message="X does not have valid feature names, but LinearRegression was fitted with feature names")
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index>=0:
        x[loc_index] = 1

    return round(__model.predict([x])[0],2)


def load_saved_artifacts():
    print("loading saved artifacts...start")
    global  __data_columns

    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']

    global __model
    if __model is None:
        with open('./artifacts/banglore_home_price_model.dat', 'rb') as f:
            __model = pickle.load(f)
    print("loading saved artifacts...done")

def get_data_columns():
    if __data_columns==None:
        load_saved_artifacts()
    return __data_columns

if __name__ == '__main__':
    load_saved_artifacts()