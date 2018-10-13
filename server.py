#!/usr/bin/env python3
import tornado.ioloop
import tornado.web as web
import mysql.connector
import os

db = mysql.connector.connect(
    host="localhost",
    user="geotrash",
    passwd="ifeelfree",
    database="geotrash"
)
c = db.cursor()
print(os.path.dirname(__file__))
public_root = os.path.join(os.path.dirname(__file__), 'public')

class MainHandler(web.RequestHandler):
    def get(self):
        c.execute("select * from bins")
        r = c.fetchall()
        self.render("geotrash.html", title="GeoTrash", items = r)

class PostHandler(web.RequestHandler):
    def post(self):
        lat = self.get_argument('lat')
        lon = self.get_argument('lon')
        code = self.get_argument('code')
        floor = self.get_argument('floor')
        sql = "INSERT INTO bins (lat, lon, code, floor) values (%s, %s, %s, %s)"
        val = (lat, lon, code, floor)
        c.execute(sql, val)
        db.commit()

def make_app():

    return web.Application([
        (r"/add", PostHandler),
        (r"/", MainHandler),
        (r'/public/(.*)', web.StaticFileHandler, {'path': public_root})
    ])
def main():
    app = make_app()
    app.listen(6969)
    tornado.ioloop.IOLoop.current().start()
if __name__ == "__main__":
    main()
