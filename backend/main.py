from flask import Flask, request
import sqlite3
import json

app = Flask(__name__)


def addData(username, email, password):
    print("Adding Data")
    conn = sqlite3.connect('loginapp.db')
    c = conn.cursor()
    c.execute("INSERT INTO credentials VALUES ('{}','{}','{}')".format(
        username, email, password))
    conn.commit()
    conn.close()
    print("Adding Data Successful")
    return 'success'


def verifyData(email, password):
    print('verify data')
    print(email, password)
    conn = sqlite3.connect('loginapp.db')
    c = conn.cursor()
    c.execute("SELECT * FROM credentials WHERE email='{}'".format(email))
    conn.commit()
    tup = c.fetchone()
    conn.close()
    status_dict = {}
    if not tup:
        status_dict["status"] = "nil"
        status_json = json.dumps(status_dict)
        print('Please Sign UP')
        print(status_json)
        return status_json
    print('Checking Database')
    db_password = tup[1]
    if db_password != password:
        status_dict["status"] = "incorrect"
        status_json = json.dumps(status_dict)
        print('incorrect password')
        return status_json
    print("success")
    status_dict["status"] = "success"
    status_json = json.dumps(status_dict)
    return status_json


@app.route('/', methods=['POST', 'GET'])
def signIn():
    print('Sing in')
    if request.method == 'POST':
        # if data sent as json, ie application/json, the we can't get it
        # by using request.form, we have to use either .data or .get_json()
        # get_json will return a dict
        data = request.get_json()
        email = data["email"]
        password = data["password"]
        print(email, password)
        return verifyData(email, password)


@app.route('/signUp', methods=['POST', 'GET'])
def signUp():
    print('Welcome to SignUp')
    if request.method == 'POST':
        # if data sent as json, ie application/json, the we can't get it
        # by using request.form, we have to use either .data or .get_json()
        # get_json will return a dict
        data = request.get_json()
        username = data["username"]
        email = data["email"]
        password = data["password"]
        print(email, password)
        return addData(username, email, password)


if __name__ == '__main__':
    app.run(debug=True)

"""
# Create Database
conn = sqlite3.connect('loginapp.db')
c = conn.cursor()
conn.execute('''CREATE TABLE credentials
         (username text,
         email text,
         password text )''')
conn.commit()
conn.close()
"""
