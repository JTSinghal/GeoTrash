#!/usr/bin/env python3
import tornado.ioloop
import tornado.web as web
import mysql.connector
import os

public_root = os.path.join(os.path.dirname(__file__), 'public')
images_root = os.path.join(os.path.dirname(__file__), 'Images')

class MainHandler(web.RequestHandler):
    def get(self):
        self.render("geotrash.html", title="GeoTrash")

class Retrieve(web.RequestHandler):
    def get(self):
        _, c = get_cursor()
        c.execute("select lat, lon, code, floor from bins")
        r = c.fetchall()
        d = {}
        index = 0
        for i in r:
            d[index] = {"lat":i[0], "lng": i[1], "code": i[2], "floor":i[3]}
            index += 1
        self.write(d)
        c.close()

class PostHandler(web.RequestHandler):
    def post(self):
        lat = self.get_argument('lat')
        lon = self.get_argument('lon')
        code = self.get_argument('code')
        floor = self.get_argument('floor')
        sql = "INSERT INTO bins (lat, lon, code, floor) values (%s, %s, %s, %s)"
        val = (lat, lon, code, floor)
        db, c = get_cursor()
        c.execute(sql, val)
        db.commit()
        c.close()

def get_cursor():

    db = mysql.connector.connect(
        host="localhost",
        user="geotrash",
        passwd="ifeelfree",
        database="geotrash"
    )
    c = db.cursor()
    return db, c
def make_app():

    return web.Application([
        (r"/add", PostHandler),
        (r"/", MainHandler),
        (r'/public/(.*)', web.StaticFileHandler, {'path': public_root}),
        (r'/Images/(.*)', web.StaticFileHandler, {'path': images_root}),
        (r"/retrieve", Retrieve)

    ])
def main():
    app = make_app()
    http_server = tornado.httpserver.HTTPServer(app, ssl_options={
        "certfile": "/usr/lib/ssl/certs/cert.pem",
        "keyfile": "/usr/lib/ssl/certs/key.pem",
    })
    http_server.listen(8443)
    tornado.ioloop.IOLoop.current().start()
if __name__ == "__main__":
    main()
