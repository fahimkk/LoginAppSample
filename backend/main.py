from flask import Flask, request
import sqlite3

app = Flask(__name__)

def addData(username, password):
    conn = sqlite3.connect('loginapp.db')
    c = conn.cursor()
    c.execute("INSERT INTO credentials VALUES ('{}','{}')".format(username, password))
    conn.commit()
    conn.close()


@app.route('/', methods=['POST', 'GET'])
def hello():
    print('before hello')
    if request.method == 'POST':
        # if data sent as json, ie application/json, the we can't get it
        # by using request.form, we have to use either .data or .get_json()
        # get_json will return a dict
        data = request.get_json()
        username = data["username"]
        password = data["password"]
        addData(username, password)
        return "OK"


if __name__ == '__main__':
    app.run(debug=True)

"""
# Create Database
conn = sqlite3.connect('loginapp.db')
c = conn.cursor()
conn.execute('''CREATE TABLE credentials
         (username text,
         password text )''')
conn.commit()
conn.close()
"""
