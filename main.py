from flask import Flask, request
from geolib import geohash
from flask_cors import CORS, cross_origin
import requests

#geohash.encode(latitude, longitude, precision)

app=Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/")
@cross_origin()
def hello():
    print("hello")
    return app.send_static_file("events.html")



#https://newproj9527.wl.r.appspot.com/
@app.route("/events")
@cross_origin()
def eventdetails():
    #app.send_static_file("events.html")
    # print("hello")
    
    details=request.args
    # print(details)

    link="https://app.ticketmaster.com/discovery/v2/events.json"
    
    
    # '''" + "keyword=" + details["keyword"] + "&category=" + details["category"] + 
    # "&radius=" + details["radius"]'''
    
    # allSegIds = details["segmentID"].split("_")

    # print("allSegIds--> ", allSegIds)
    
    lati=details["lat"]
    longi=details["lng"]
    g_hash = geohash.encode(lati, longi, 7)

    # print(details["radius"])

        

    link_elements={
                        "apikey":"Z3ZZ0HqSBAnjLGhrJVne6ajpAuUa2upX",
                        "keyword":details["keyword"],
                        "radius":10,
                        "unit":"miles",
                        #"segmentId":allSegIds[0],
                        "geoPoint":g_hash

                    }
    
    if "radius" in details:
        link_elements["radius"]=details["radius"]

    if "segmentId" in details:
        link_elements["segmentId"]=details["segmentId"]

    # print(link_elements)
        
    response=requests.get(link, link_elements)
    
    return response.json()

    # return response

@app.route("/event_card")
@cross_origin()
def event_card():
    e_details=request.args
    # print("e_details:",e_details['id'])
    # e_link="https://app.ticketmaster.com/discovery/v2/events/G5diZfkn0B-bh.json?apikey=Z3ZZ0HqSBAnjLGhrJVne6ajpAuUa2upX"
    e_link="https://app.ticketmaster.com/discovery/v2/events/"+e_details['id']+"?apikey=Z3ZZ0HqSBAnjLGhrJVne6ajpAuUa2upX"
    # e_link_elements={
    #     "id":e_details[id]
    # }

    # print(e_link)

    e_response=requests.get(e_link)
    # print(e_response.json())
    return e_response.json()

@app.route("/venue_card")
@cross_origin()
def venue_card():
    v_details=request.args
    # print("e_details:",e_details['id'])
    # e_link="https://app.ticketmaster.com/discovery/v2/events/G5diZfkn0B-bh.json?apikey=Z3ZZ0HqSBAnjLGhrJVne6ajpAuUa2upX"
    v_link="https://app.ticketmaster.com/discovery/v2/venues.json?keyword="+v_details['keyword']+"&apikey=Z3ZZ0HqSBAnjLGhrJVne6ajpAuUa2upX"
    v_response=requests.get(v_link)
    # print(e_response.json())
    return v_response.json()

if __name__ == '__main__':

   
    # app.run(host='https://newproj9527.wl.r.appspot.com/events', port=8080, debug=True)
    # app.run(host="127.0.0.1", port= 8080, debug=True)
    app.run(host='https://newproj9527.wl.r.appspot.com', port= 8080, debug=True)
    
# [END gae_python3_app]
# [END gae_python38_app]
