from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flaskext.mysql import MySQL
from webargs import fields
from webargs.flaskparser import parser

app = Flask(__name__)
CORS(app, support_credentials=True)
mysql = MySQL()

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'example_user'
app.config['MYSQL_DATABASE_PASSWORD'] = 'QWVixbwjszxkQ8Xc'
app.config['MYSQL_DATABASE_DB'] = 'example'
app.config['MYSQL_DATABASE_HOST'] = 'mysql.server'

mysql.init_app(app)

articles_args = {
    'count': fields.Int(missing=0, required=True),
    'limit': fields.Int(missing=25, required=True)
}

@app.route('/articles', methods=['GET'])
@cross_origin(supports_credentials=True)
def articles():
    args = parser.parse(articles_args, request)
    cur = mysql.connect().cursor()
    cur.execute('select * from articles limit {},{}'.format(args['count'], args['limit']))
    r = [dict((cur.description[i][0], value)
              for i, value in enumerate(row)) for row in cur.fetchall()]

    return jsonify({
        'has_more': True if len(r) == args['ps'] else False,
        'data': r,
        'success': True
    })

if __name__ == '__main__':
    app.run()