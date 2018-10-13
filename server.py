import tornado.ioloop
import tornado.web
import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="geotrash",
    passwd="ifeelfree"
)
c = db.cursor()
class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html", title="GeoTrash")

class PostHandler(tornado.web.RequestHandler):
    def post(self):
        lat = self.get_argument('lat')
        lon = self.get_argument('lon')
        code = self.get_argument('code')
        floor = self.get_argument('floor')
        sql = "INSERT INTO bins (lat, lon, code, floor) values (%f, %f, %d, %d)"
        val = (lat, lon, code, floor)
        c.execute(sql, val)
        db.commit()

def make_app():

    return tornado.web.Application([
        (r"/add", PostHandler),
        (r"/", MainHandler),
    ])
def main():
    app = make_app()
    app.listen(6969)
    tornado.ioloop.IOLoop.current().start()
if __name__ == "__main__":
    main()
