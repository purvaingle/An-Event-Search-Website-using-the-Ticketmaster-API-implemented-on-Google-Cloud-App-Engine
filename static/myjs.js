var lat, lng;
var ip_latlong;
var locArr;
var api_resp;
var obj_event_data; 
const API_KEY = "AIzaSyAsUT6mL4V3D2SQDX5ltEWbuh2C5g0pph4";
    // const DOMAIN_URL = "http://127.0.0.1:8080/";
    const DOMAIN_URL = "https://newproj9527.wl.r.appspot.com/"
    var dict_segmentID={}

    dict_segmentID = {
        "Default": "KZFzniwnSyZfZ7v7nJ_KZFzniwnSyZfZ7v7nE_KZFzniwnSyZfZ7v7na_KZFzniwnSyZfZ7v7nn_KZFzniwnSyZfZ7v7n1",
        "Music":"KZFzniwnSyZfZ7v7nJ",
        "Sports": "KZFzniwnSyZfZ7v7nE",
        "Arts & Theatre":"KZFzniwnSyZfZ7v7na",
        "Film": "KZFzniwnSyZfZ7v7nn",
        "Miscellaneous": "KZFzniwnSyZfZ7v7n1"
    }


function onSubmit (form){
    // form.preventDefault();

    document.getElementById("event_info").innerHTML=''

    
    
    if(document.getElementById("checkbox").checked){
        fetch("https://ipinfo.io/json?token=1601cde681c5d6")
        .then(response => response.json())
        .then(jsonResponse => {
        ip_latlong=jsonResponse.loc; 
        locArr = ip_latlong.split(',');
        console.log(locArr[0], locArr[1])
        lat=locArr[0]
        lng=locArr[1]
        console.log("Checkeddddd")

        var link_e = "";
        const keyword= form.keyword.value
        const category= form.classificationName.value
        const radius= form.radius.value
        // const segmentId=dict_segmentID[category]

        var segId = ""

        link_e= `keyword=${keyword}&radius=${radius}&lat=${lat}&lng=${lng}`
        if (category!="Default"){
            const segmentId=dict_segmentID[category]
            link_e+="&segmentId=" +segmentId
        }
        console.log(link_e)

        api_resp=fetch(DOMAIN_URL + "events?" + link_e)
        api_resp.then(res=>res.json())
        .then(function(data){

            
            
        console.log(data);

        // let count=Object.keys(data).length
        // console.log(count)
        // var events=data["_embedded"]["events"]
       
        if (data.hasOwnProperty("_embedded") && data._embedded.hasOwnProperty("events")){
            obj_event_data=data

            console.log("embedded")

            var H=document.getElementById("headers")
            H.innerHTML=''

            var T=document.getElementById("details")
            T.innerHTML=''
            // document.getElementById()

            var events=data["_embedded"]["events"]
            
            console.log(events)
            var len_events;

            if (events.length>20){
                len_events=20;
            }
            else{
                len_events=events.length
            }
            
            var first_row=document.createElement('tr')
            // document.getElementById("display_table").style.display="table";
            first_row.innerHTML='<tr> <td style="padding:20px;">Date</td><td>Icon</td><td onclick="sort_list(2)">Event</td><td onclick="sort_list(3)">Genre</td><td onclick="sort_list(4)">Venue</td></tr>'
            document.getElementById("headers").appendChild(first_row)
            // for (let event in events){
            for (var i =0; i<len_events;++i){
                
                
                console.log(events[i])
                var e_date=""
                var e_time=""
                var e_icon=""
                var e_name=""
                var e_genre=""
                var e_venue=""



                if (events[i].hasOwnProperty("dates") && events[i].dates.hasOwnProperty("start")){
                    console.log("entered date1")
                    if (events[i].dates.start.hasOwnProperty("localDate")){
                        console.log("entered date2")
                        e_date=events[i].dates.start.localDate
                        console.log("date__>"+e_date)
                    }

                    if (events[i].dates.start.hasOwnProperty("localTime")){
                        e_time=events[i].dates.start.localTime
                        console.log("time>"+e_time)
                    }

                }

                if (events[i].hasOwnProperty("images")){
                    if (events[i].images[0].hasOwnProperty("url")){
                        e_icon=events[i].images[0].url
                        console.log("url-->"+e_icon)
                    }
                }

                if (events[i].hasOwnProperty("name")){
                    e_name=events[i].name
                    console.log("name-->"+e_name)
                }

                if (events[i].hasOwnProperty("classifications")){ //classifications is an array
                    if(events[i].classifications[0].hasOwnProperty("segment")){
                        if (events[i].classifications[0].segment.hasOwnProperty("name")){
                        e_genre=events[i].classifications[0].segment.name
                        console.log("genre->"+e_genre)
                    }
                }
                }

                if (events[i].hasOwnProperty("_embedded")){ 
                    if(events[i]._embedded.hasOwnProperty("venues")){
                        if (events[i]._embedded.venues[0].hasOwnProperty("name")){
                        e_venue=events[i]._embedded.venues[0].name
                        console.log("venue->"+e_venue)
                    }
                }
            }

                


                var record=document.createElement('tr')
                record.innerHTML='<td>'+  e_date + '<br>'+ e_time + '</td>' + '<td>' + '<img src= " ' +  e_icon  + ' " width="150" height="100" onerror="this.style.display = \'none\';" /></img></td>' + '<td> <a id="anch" style="cursor:pointer;" onClick="displayevent(\'' + i + '\',\'' + events[i].id + '\')">'+  e_name  + '</a></td>' + '<td>'+  e_genre  + '</td>' + '<td>'+  e_venue  + '</td>';
                document.getElementById("details").appendChild(record);


            }
                
    
           
            

        }
        else{
            var H=document.getElementById("headers")
            H.innerHTML=''

            var T=document.getElementById("details")
            T.innerHTML=''
            console.log("No Records")
            var row=document.createElement('tr')
            row.innerHTML='<p style="color:red; font-size=20px;"> No Records found <p>'
            document.getElementById("details").appendChild(row);

        }

        })
    }); 
    
}
 
    

    else {
        const address = form.location.value;
    const geocodeUrl = 
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;
        
        fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
        lat = data.results[0].geometry.location.lat;
        lng = data.results[0].geometry.location.lng;
        var link_e = "";
        const keyword= form.keyword.value
        const category= form.classificationName.value
        const radius= form.radius.value
        // const segmentId=dict_segmentID[category]

        var segId = ""

        // link_e= `keyword=${keyword}&segmentID=${segmentID}&radius=${radius}&lat=${lat}&lng=${lng}`
        link_e= `keyword=${keyword}&radius=${radius}&lat=${lat}&lng=${lng}`
        if (category!="Default"){
            const segmentId=dict_segmentID[category]
            link_e+="&segmentId=" +segmentId
        }
        console.log(link_e)

        api_resp=fetch(DOMAIN_URL + "events?" + link_e)
        api_resp.then(res=>res.json())
        .then(function(data){

            
            
        console.log(data);

        // let count=Object.keys(data).length
        // console.log(count)
        // var events=data["_embedded"]["events"]
       
        if (data.hasOwnProperty("_embedded") && data._embedded.hasOwnProperty("events")){
            obj_event_data=data

            console.log("embedded")

            var H=document.getElementById("headers")
            H.innerHTML=''

            var T=document.getElementById("details")
            T.innerHTML=''
            // document.getElementById()


            var events=data["_embedded"]["events"]
            
            console.log(events)
            
            var first_row=document.createElement('tr')
            // document.getElementById("display_table").style.display="table";
            first_row.innerHTML='<tr> <td style="padding:20px;">Date</td><td>Icon</td><td onMouseOver="this.style.cursor=\"pointer\"" onclick="sort_list(2)">Event</td><td onclick="sort_list(3)">Genre</td><td onclick="sort_list(4)">Venue</td></tr>'
            document.getElementById("headers").appendChild(first_row)
            // for (let event in events){
            for (var i =0; i<events.length;++i){
                
                
                console.log(events[i])
                var e_date=""
                var e_time=""
                var e_icon=""
                var e_name=""
                var e_genre=""
                var e_venue=""



                if (events[i].hasOwnProperty("dates") && events[i].dates.hasOwnProperty("start")){
                    console.log("entered date1")
                    if (events[i].dates.start.hasOwnProperty("localDate")){
                        console.log("entered date2")
                        e_date=events[i].dates.start.localDate
                        console.log("date__>"+e_date)
                    }

                    if (events[i].dates.start.hasOwnProperty("localTime")){
                        e_time=events[i].dates.start.localTime
                        console.log("time>"+e_time)
                    }

                }

                if (events[i].hasOwnProperty("images")){
                    if (events[i].images[0].hasOwnProperty("url")){
                        e_icon=events[i].images[0].url
                        console.log("url-->"+e_icon)
                    }
                }

                if (events[i].hasOwnProperty("name")){
                    e_name=events[i].name
                    console.log("name-->"+e_name)
                }

                if (events[i].hasOwnProperty("classifications")){ //classifications is an array
                    if(events[i].classifications[0].hasOwnProperty("segment")){
                        if (events[i].classifications[0].segment.hasOwnProperty("name")){
                        e_genre=events[i].classifications[0].segment.name
                        console.log("genre->"+e_genre)
                    }
                }
                }

                if (events[i].hasOwnProperty("_embedded")){ 
                    if(events[i]._embedded.hasOwnProperty("venues")){
                        if (events[i]._embedded.venues[0].hasOwnProperty("name")){
                        e_venue=events[i]._embedded.venues[0].name
                        console.log("venue->"+e_venue)
                    }
                }
            }

                


                var record=document.createElement('tr')
                record.innerHTML='<td>'+  e_date + '<br>'+ e_time + '</td>' + '<td>' + '<img src= " ' +  e_icon  + ' " width="150" height="100"></img></td>' + '<td> <a id="anch" style="cursor:pointer;" onClick="displayevent(\'' + i + '\',\'' + events[i].id + '\')">'+  e_name  + '</a></td>' + '<td>'+  e_genre  + '</td>' + '<td>'+  e_venue  + '</td>';
                document.getElementById("details").appendChild(record);

            }

        }
        else{

            var H=document.getElementById("headers")
            H.innerHTML=''

            var T=document.getElementById("details")
            T.innerHTML=''

            console.log("No Records")
            var row=document.createElement('tr')
            row.innerHTML='<p style="color:red; font-size=20px;"> No Records found <p>'
            document.getElementById("details").appendChild(row);

            }

        // function displayevent(ind){
        //     var event_card=document.createElement('div')
        //     event_card.innerHTML='<div id="box" style="margin-top: 40px;">' + events[i].name +'</div>'
        //     document.getElementById("event_info").appendChild(event_card)
        // }

        })

        // console.log("all data: " + all_event_data)
    }); 

    }
    return false;
}

function displayevent(ind, e_id){
    console.log("in the function")
    

const api_resp2=fetch(DOMAIN_URL + 'event_card?id='+e_id)
api_resp2.then(res=>res.json())
.then(function(data){
    console.log(data)

    const display_event=data

    // console.log(display_event.classifications, display_event.classifications[0], display_event.classifications[0].genre, display_event.classifications[0].genre.name);
    document.getElementById("event_info").innerHTML=''
    var event_card=document.createElement('div')
    var datetime=''
    var artist=''
    var venue=''
    var genres=''
    var price=''
    var status=''
    var tick_link=''
    var seatmp=''
    var artist_url=''
    var st_color=''

    if(display_event.hasOwnProperty("dates")){
        if(display_event.dates.hasOwnProperty("start")){
            if (display_event.dates.start.hasOwnProperty("localDate")){
                datetime=datetime+ display_event.dates.start.localDate
    }}}

    if(display_event.hasOwnProperty("dates")){
        if(display_event.dates.hasOwnProperty("start")){
            if (display_event.dates.start.hasOwnProperty("localTime")){
                datetime=datetime+ display_event.dates.start.localTime
    }}}

    // artist
    if(display_event._embedded.hasOwnProperty("attractions")){
        for(var k=0; k<display_event._embedded.attractions.length; ++k){
        if (display_event._embedded.attractions[k].hasOwnProperty("name")){
        artist=artist+display_event._embedded.attractions[k].name + ' | '
        }
    }}

    if(display_event._embedded.hasOwnProperty("venues")){
    if (display_event._embedded.venues[0].hasOwnProperty("name")){
        venue=display_event._embedded.venues[0].name
    }}

    if(display_event.classifications[0].hasOwnProperty("genre")){
        if ((display_event.classifications[0].genre.hasOwnProperty("name")) && (display_event.classifications[0].genre.name!='Undefined')){
        genres= genres+display_event.classifications[0].genre.name + ' | '
    }}


    if(display_event.classifications[0].hasOwnProperty("subGenre")){
    if ((display_event.classifications[0].subGenre.hasOwnProperty("name"))&& (display_event.classifications[0].subGenre.name!='Undefined')){
        genres=genres+display_event.classifications[0].subGenre.name + ' | '
    }}

    if(display_event.classifications[0].hasOwnProperty("type")){
    if ((display_event.classifications[0].type.hasOwnProperty("name")) && (display_event.classifications[0].type.name!='Undefined')){
        genres=genres+display_event.classifications[0].type.name + ' | '
    }}


    if(display_event.classifications[0].hasOwnProperty("subType")){
    if ((display_event.classifications[0].subType.hasOwnProperty("name")) && (display_event.classifications[0].subType.name!='Undefined')){
        genres=genres+display_event.classifications[0].subType.name
    }}

    // price range
    if(display_event.hasOwnProperty("priceRanges")){
    if (display_event.priceRanges[0].hasOwnProperty("min") && display_event.priceRanges[0].hasOwnProperty("max")){
        price=display_event.priceRanges[0].min + ' - ' + display_event.priceRanges[0].max + ' '+ display_event.priceRanges[0].currency 
    }}

    // ticket status
    if(display_event.hasOwnProperty("dates")){
        if(display_event.dates.hasOwnProperty("status")){
            if (display_event.dates.status.hasOwnProperty("code")){
                status=display_event.dates.status.code
    }}

    if (status=="onsale"){
        st_color="green";

    }
    if (status=="offsale"){
        st_color="red";

    }
    if (status=="rescheduled"){
        st_color="yellow";

    }

    if (status=="canceled"){
        st_color="black";

    }

    if (status=="postponed"){
        st_color="orange";

    }

    if (datetime==''){
        datetime='NA'
    }

    if (artist==''){
        artist='NA'
    }

    if (venue==''){
        venue='NA'
    }

    if (genres==''){
        genres='NA'
    }

    if (price==''){
        price='NA'
    }

    if (status==''){
        status='NA'
    }


}

    // buy tickets at
    if (display_event.hasOwnProperty("url")){
        tick_link=tick_link+display_event.url
    }

    if(display_event.hasOwnProperty("seatmap")){
    if(display_event.seatmap.hasOwnProperty("staticUrl")){
        seatmp=display_event.seatmap.staticUrl
    }}

    if (display_event.hasOwnProperty("_embedded")){
                    if(display_event._embedded.hasOwnProperty("attractions")){
                        if(display_event._embedded.attractions[0].hasOwnProperty("externalLinks")){
                            if(display_event._embedded.attractions[0].externalLinks.hasOwnProperty("homepage")){
                                if(display_event._embedded.attractions[0].externalLinks.homepage[0].hasOwnProperty("url")){
                                    artist_url=display_event._embedded.attractions[0].externalLinks.homepage[0].url;
                        
                    }
                        
                    }
                        
                    }
                    }
                }

    event_card.innerHTML='<div class="box" style="margin-top: 40px;"> <p class="center" style="font-size:25px; color:white; align:center; font-family: Arial, Helvetica, sans-serif; margin-top:20px;"> ' + display_event.name + 
    '</p> <table style="margin-left:30px;"> <tr> <td style="text-align:left; font-family: Arial, Helvetica, sans-serif; margin-left:20px; padding:20px;">'+ 
    '<li style="font-size:18px; list-style-type: none; color: #9afde4; ">Date</li><li style="font-size:12px; color: white; list-style-type: none;">'+  datetime +'</li> <br>' + 
    '<li style="font-size:18px; list-style-type: none; color: #9afde4; ">Artist/Team</li><a id="art" target="_blank" href="' + artist_url +'"style="font-size:12px; color: #59c4fa; text-decoration:none; list-style-type: none;" onMouseOver="this.style.color=\'#556da7\'">'+ artist + '</a> <br>'+
    '<br> <li style="font-size:18px; list-style-type: none; color: #9afde4; ">Venue</li><li style="font-size:12px; color: white; list-style-type: none;">'+ venue + '</li><br>' +
    '<li style="font-size:18px; list-style-type: none; color: #9afde4; ">Genres</li><li style="font-size:12px; color: white; list-style-type: none;">'+ genres + '</li><br>' +
    '<li style="font-size:18px; list-style-type: none; color: #9afde4; ">Price Ranges</li><li style="font-size:12px; color: white; list-style-type: none;">'+ price  + '</li><br>' +
    '<li style="font-size:18px; list-style-type: none; color: #9afde4; ">Ticket Status</li><li style="font-size:12px; color: white; list-style-type: none;"> <div class="status_div" style="background-color:'+ st_color+'">'+ status + '</div></li><br>' +
    '<li style="font-size:18px; list-style-type: none; color: #9afde4; text-decoration:none;">Buy Ticket At:</li><a target="_blank" href="'+ tick_link + '" style="font-size:12px; color: #59c4fa; text-decoration:none; list-style-type: none;" onMouseOver="this.style.color=\'#556da7\'"> Ticketmaster</a></td> <td style="text-align:right; padding:20px; margin-right:20px;"><img id="img1" src=\''
    +seatmp+'\' width="385px" height="250px" align="right" onerror="this.style.display = \'none\';" /></img></td></tr></table></div>'
    // '<div class="box" style="margin-top: 40px;"> <p style="font-size:25px; color:white; align=center; font-family: Arial, Helvetica, sans-serif;">' + display_event.name +'</p><table>' +'<tr style="text-align:ceter;"> <td style="text-align:left; font-family: Arial, Helvetica, sans-serif; "> <p style="font-size:18px; color: green;">Date</p><br> <br>'+ display_event.dates.start.localDate + display_event.dates.start.localTime+ '<p style="font-size:18px; color: green;>Artist/Team</p> <br> <br> <a>' + display_event._embedded.attractions[0].name +'</a></td></tr></table>'
    var card_body=document.getElementById("event_info")
    card_body.appendChild(event_card)
    var labels=document.createElement('div')
    document.getElementById("venue_label").innerHTML='';
    document.getElementById("v_card").innerHTML='';
    labels.innerHTML='<li style="font-size:25px; list-style-type: none; color: white; text-align:center; ">Show Venue Details</li><span onclick="show_venue(\''+ venue +'\')" style="font-size: 72px;color: white;text-align:center; margin:auto; cursor:pointer;">⌄</span>'
    document.getElementById("venue_label").appendChild(labels)
    event_card.scrollIntoView(); 
    
}); 

    

    
}

function show_venue(ven){
    var venue_name='';
    var img_url='';
    var addr='';
    var city_name='';
    var postal='';
    var ven_url='';
    var state_name='';

    

    console.log("in the venue card function")
    document.getElementById("v_card").innerHTML='';
    const api_resp3=fetch(DOMAIN_URL + 'venue_card?keyword=' + ven)
    api_resp3.then(res=>res.json())
    .then(function(data){
    console.log(data)

    if (data.hasOwnProperty("_embedded")){

    const display_venue=data["_embedded"]
    document.getElementById("venue_label").innerHTML='';
    
    
    var venue_details=document.createElement('div')
    
    if (display_venue.hasOwnProperty("venues")){
        if (display_venue.venues[0].hasOwnProperty("name")){
            venue_name=display_venue.venues[0].name;
        }
        
    }
    

    if (display_venue.hasOwnProperty("venues")){
        if (display_venue.venues[0].hasOwnProperty("images")){
            if (display_venue.venues[0].images[0].hasOwnProperty("url")){

                img_url=display_venue.venues[0].images[0].url;
            }
            
        }
        
    }

    if (display_venue.hasOwnProperty("venues")){
        if (display_venue.venues[0].hasOwnProperty("address")){
            if (display_venue.venues[0].address.hasOwnProperty("line1")){
                addr=display_venue.venues[0].address.line1
            }
        } 
        
        if (display_venue.venues[0].hasOwnProperty("city")){
            if(display_venue.venues[0].city.hasOwnProperty("name")){
            city_name=display_venue.venues[0].city.name
        }
    }

        if (display_venue.venues[0].hasOwnProperty("postalCode")){
            
            postal=display_venue.venues[0].postalCode
        }

        if (display_venue.venues[0].hasOwnProperty("state")){
            if(display_venue.venues[0].state.hasOwnProperty('stateCode')){
                state_name=display_venue.venues[0].state.stateCode
            }
            
            
        }

        if(display_venue.venues[0].hasOwnProperty("url")){
            ven_url=display_venue.venues[0].url
        }


    }

    var gmap_addr='';
    
    if ((addr +city_name +state_name +postal)==''){
        addr='NA';
    }
    gmap_addr=venue_name+ ', ' + addr+', ' +city_name+', ' +state_name+' ' +postal
    gmap_addr=encodeURIComponent(gmap_addr);
    console.log("encoded part"+gmap_addr);

    var full_url='';
    full_url='https://www.google.com/maps/search/?api=1&query=' + gmap_addr;


    venue_details.innerHTML='<div class="venue_box " style="margin-top: 30px;"> <div class="venue_box_border"><p class="center" style="font-size:27px; color:black; align:center; font-family: Arial, Helvetica, sans-serif; margin-top:20px; text-decoration:underline;"> ' + venue_name + 
        '<br><img src=' + img_url+' width=\"100px\" height=\"80px\" style="text-align:center;" onerror="this.style.display = \'none\';" /></img>'
    +    '<table style="width:650px; height:200px; margin:auto;"> <tr><td class="venue_td"> <p> Address:'+ ' ' + addr + '<br>' + city_name + '<br>' + state_name+ ' ' +postal+
        '</p><br> <a id="maps" href="'+ full_url+ '" style="color: #59c4fa; text-decoration: none; " target="_blank" onMouseOver="this.style.color=\'#556da7\'">Open in Google Maps</p> </td><td class="venue_td" style="border-left:1px solid black;"><a href=\''+ ven_url + '\'style="text-decoration:none; color: #59c4fa;" target="_blank" onMouseOver="this.style.color=\'#556da7\'">More events at this venue</a>' 
        
        
        
        +' </td></tr> </table>'                
        +'</p> </div></div>'
    document.getElementById('v_card').appendChild(venue_details)
    document.getElementById('v_card').scrollIntoView()
        }

});



}

function hide_loc(btn){

    var location_ip=document.getElementById("loc_box")
    if (btn.checked){
        location_ip.style.display="none"
    }

    if (btn.checked==false){
        location_ip.style.display="block"
    }
    // location_ip.style.display=btn.checked==false? "block":"none";

}    

function img_error(){

}

// credits for the sort_list function: https://codepen.io/andrese52/pen/ZJENqp
function sort_list(n){
    
    var table,rows,switching,i,x,y,shouldSwitch,dir, t_body
    switchcount = 0;
    table = document.getElementById("display_table");
    switching = true;
    dir = "asc";
    
    while (switching) {
      switching = false;
    //   t_body = table.getElementsByTagName("tbody");
    
      rows=table.getElementsByTagName("tr");
   
      for (i = 1; i < rows.length - 1; i++) { 
        shouldSwitch = false;
        
        x = rows[i].getElementsByTagName("td")[n];
        y = rows[i + 1].getElementsByTagName("td")[n];
        
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {

        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
         
    
    
}    