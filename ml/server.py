import json
from http.server import BaseHTTPRequestHandler, HTTPServer
import NER

class RequestHandler(BaseHTTPRequestHandler):

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)

        # Save the dictionary as a JSON file to prepare them for further dump into MongoDB
        with open('data.json', 'w', encoding='UTF-8') as f:
            json.dump(data, f)

        print(NER.nerTask(data['body']))

        self.send_response(200)
        self.end_headers()
        self.wfile.write(json.dumps({"message": f"Ваш {data['author']} отозвался о нашем продукте: {data['body']}"}).encode('utf-8'))

def run(server_class=HTTPServer, handler_class=RequestHandler):
    server_address = ('', 8000)
    httpd = server_class(server_address, handler_class)
    print('Server running at port 8000...')
    httpd.serve_forever()

run()
