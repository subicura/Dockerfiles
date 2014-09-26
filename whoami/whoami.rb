#!/usr/bin/env ruby

require 'webrick'
require 'socket'

class MyServlet < WEBrick::HTTPServlet::AbstractServlet
    def do_GET (request, response)
        response.status = 200
        response.content_type = "text/plain"
        hostname = Socket.gethostname
        result = "I'm #{hostname}"
        
        response.body = result.to_s + "\n"
    end
end

server = WEBrick::HTTPServer.new(:Port => 8080)

server.mount "/", MyServlet

trap("INT") {
    server.shutdown
}

server.start

