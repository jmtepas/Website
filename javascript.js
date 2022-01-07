var gallery_names = ["Soaring",3,"Flying",3, "Something",3]
var home_img_list = []
var all_img_list = []
var all_img_list = [["home/1.jpeg","home/1.jpeg","home/1.jpeg","home/1.jpeg","home/1.jpeg","home/1.jpeg"],["home/2.JPG","home/2.JPG","home/2.JPG","home/2.JPG","home/2.JPG","home/2.JPG"],["home/3.jpeg","home/3.jpeg","home/3.jpeg"]]
var img_list = []
var viewer_on

document.addEventListener("DOMContentLoaded", function(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        document.getElementById("loading_page").style.display = "none"
    }
    else{
        document.getElementById("loading_page_mobile").style.display = "none"
    }
})

function go_gallery(){
    current_pic = 0
    jQuery("#gallery").fadeIn(0).fadeTo(0,0)
    jQuery("#home").fadeOut(500, function(){
        jQuery('html, body').css('overflowY', 'auto');
        jQuery("#gallery").fadeTo(500,1)
        viewer_on = false 
        on_home = false

    })
}

function check_src(src1){
    var ok = true
    jQuery.ajax({
        url: src1,
        type: "HEAD",
        async: false,
        error: function(){
             ok = false
        },
        success: function(){
            ok = true
        }
    });
    return ok
}

var on_home = true
var home_pic = 0 
var home_img = "#home_img1" 

function home_changer(){
    if(on_home == true){
        if(home_img=="#home_img1"){
            jQuery(home_img).delay(7000).fadeTo(2000,0,function(){
                home_pic = (home_pic + 2)%home_img_list.length
                jQuery(home_img).attr("src", home_img_list[home_pic])
                jQuery(home_img).css("z-index", 25)
                jQuery(home_img).fadeTo(0,1, function(){
                    home_img = "#home_img2"
                    jQuery(home_img).css("z-index", 50)
                    home_changer()
                })
            })
        }else{
            jQuery(home_img).delay(7000).fadeTo(2000,0,function(){
                home_pic = (home_pic + 2)%home_img_list.length
                jQuery(home_img).attr("src", home_img_list[home_pic])
                jQuery(home_img).css("z-index", 25)
                jQuery(home_img).fadeTo(0,1, function(){
                    home_img = "#home_img1"
                    jQuery(home_img).css("z-index", 50)
                    home_changer()
                })
            })
        }
    }
}

function set_up_home(){
    var proceed = true
    var x = 1
    while(proceed == true){
        var path1 = "home/" + x.toString() + ".JPG"
        var path2 = "home/" + x.toString() + ".jpeg"

        var proceed2 = true
        
        var temp1 = check_src(path1)
        var temp2 = check_src(path2)
       
        if(temp1 !=true && temp2 !=true){
            proceed = false
            break
        }
        else if(temp1 ==true ){
            home_img_list.push(path1)
        }
        else{
            home_img_list.push(path2)
        }
        x++
    }
    jQuery("#home_img1").attr("src", home_img_list[0])
    jQuery("#home_img2").attr("src", home_img_list[1])
}

function set_up_gallery(callback){
    all_img_list = []
    var start = new Date(); 
    for(var x = 0; x<gallery_names.length/2; x++){
        var x_temp = x +1
        var path = "galleries/gallery_" + x_temp.toString()
        all_img_list.push([])
        var temp_limit = parseInt(gallery_names[x*2+1])
        for(var y = 0; y<temp_limit; y++){
            var y_temp = y +1
            var path2 = path + "/" +  y_temp.toString() + ".JPG"
            var path3 = path + "/" +  y_temp.toString() + ".jpeg"

            var temp2 = check_src(path2)

            if(temp2 ==true ){
                all_img_list[x].push(path2)
            }
            else{
                all_img_list[x].push(path3)
            }
        }
    }
    var end = new Date()
    callback()
}


function gallery_initialize(callback){
    var parent = document.getElementById("gallery")
    for(var x = 0; x<all_img_list.length; x++){
        div = document.createElement('div')
        div.className = "gallery_display"
        div.id = "gallery_" + (x+1).toString()
        div1 = document.createElement('div')
        div1.className = "img_containter"
        img = document.createElement('img')
        img.className = "gallery_image"
        img.src = all_img_list[x][0]
        p = document.createElement('p')
        p2 = document.createElement('p')
        p.innerHTML = gallery_names[x*2]
        p2.innerHTML = gallery_names[x*2]
        p.className = "gallery_words"
        p2.className = "gallery_words2"
        cover = document.createElement('div')
        cover.className = "gallery_cover"
        div1.appendChild(img)
        cover.appendChild(p2)
        div1.appendChild(cover)
        div1.appendChild(p)
        div.appendChild(div1)
        parent.appendChild(div)
    }
    div = document.createElement('div')
    div.className = "spacer"
    parent.appendChild(div)
    jQuery("#gallery").css("min-height", jQuery(window.top).height())
    callback()
}

function launcher(){
    jQuery("#loader_page").fadeOut(0, function(){
        jQuery("#home").fadeTo(3000,1, function(){
            home_changer()
        })
    })
}

jQuery(window).resize(function(){
    jQuery("#gallery").css("min-height", jQuery(window.top).height())
})

function retrieve_names(callback){
    jQuery.ajax({
        url: "GalleryNames.txt",
        type: "GET",
        async: false,
        error: function(){
             alert("Problem Loading Gallery Names")
        },
        success: function(names){
            names = names.replace(" ", "")
            var names1 = names.split("\n");
            var total1 = []
            for(var x = 0; x<names1.length; x++){
                var temp = names1[x].split(",")
                for(var y = 0; y<temp.length; y++){
                    if(temp[y] != "" && temp[y]!=' '){
                        total1.push(temp[y])
                    }
                }
            }
            gallery_names = total1
        }
    });
    callback()
}




var mobile = false
var viewheight
function initialize(){
    set_up_home()
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        mobile = true
        viewheight = parseInt(window.innerHeight)
        document.getElementById("viewer1_mobile").style.height = viewheight.toString() + "px"
        document.getElementById("viewer1_mobile").style.marginTop = (-1 * viewheight/2).toString() + "px"
        document.getElementById("loading_page").style.display = "none"
        document.getElementById("home_logo1").className="home_logo_mobile"
        document.getElementById("gal_logo").className="gal_logo_mobile"
        document.getElementById("home_button").className="home_button_mobile"
        document.getElementById("viewer1").style.display = "none"
        setTimeout(function () {
            retrieve_names(function(){
                set_up_gallery(function(){
                    gallery_initialize_mobile(function(){
                        launcher()
                    })
                })
            })
        },0)
      } else {
        document.getElementById("viewer1_mobile").style.display = "none"
        document.getElementById("loading_page_mobile").style.display = "none"
        mobile = false
        setTimeout(function () {
            retrieve_names(function(){
                set_up_gallery(function(){
                    gallery_initialize(function(){
                        launcher()
                    })
                })
            })
        },0)
      }
    
}


function initialize1(){
    mobile = true
    viewheight = parseInt(window.innerHeight)
    //document.getElementById("viewer1_mobile").style.height = viewheight.toString() + "px"
        document.getElementById("viewer1_mobile").style.marginTop = (-1 * viewheight/2).toString() + "px"

    //document.getElementById("home_logo1").className="home_logo_mobile"
    //document.getElementById("gal_logo").className="gal_logo_mobile"
    //document.getElementById("home_button").className="home_button_mobile"
    //document.getElementById("viewer1").style.display = "none"
    //document.getElementById("loading_page").className="loading_page_mobile"
    home_changer()

        gallery_initialize(function(){
            jQuery("#loading_page").delay(1000).fadeTo(1,1, function(){
                launcher()
            })
        })

}


jQuery(document).on('click', '.gallery_display', function(){
    if(viewer_on==false){
        jQuery("#viewer_img1").css("z-index", "50")
    jQuery("#viewer_img2").css("z-index", "100")
    jQuery("#viewer_img3").css("z-index", "25")
    jQuery("#viewer1").fadeTo(0,1)
    jQuery("#gallery").fadeTo(0,0, function(){
        jQuery("#viewer1").css("z-index", 1000000000000)
    })
    jQuery('html, body').css('overflowY', 'hidden');
    viewer_on = true
    var id1 = jQuery(this).attr('id')
    var clicked_id = id1.replace("gallery_","")
    var z = parseInt(clicked_id)-1
    img_list = all_img_list[z]
    image_list = [["#viewer_img3",img_list.length-1],["#viewer_img2",0],["#viewer_img1",1]]
    for(var x = 0; x < image_list.length; x++){
        jQuery(image_list[x][0]).attr("src",img_list[image_list[x][1]])
    }
    }
})

jQuery("#x3").on('click', function(){
    if(viewer_on == true){
    jQuery("#gallery").fadeTo(0,1)
    jQuery("#viewer1").fadeTo(0,0,  function(){
        jQuery("#viewer1").css("z-index", -10000000000000)
        if(jQuery(document).height()>jQuery(window).height()){
           jQuery('html, body').css('overflowY', 'auto');
        }
        viewer_on = false
        })
    }
})



var ok_click = true
var current_pic = 0
var image_list = []

jQuery("#right_click").on('click', function(){
    if(ok_click == true){
    ok_click = false
    jQuery(image_list[0][0]).css("z-index","25")
    jQuery(image_list[2][0]).css("z-index","50")
    image_list[0][1]  = (image_list[0][1] + 3)%img_list.length
    jQuery(image_list[0][0]).attr("src",img_list[image_list[0][1]])
    jQuery(image_list[1][0]).fadeTo(500,0, function(){
        jQuery(image_list[2][0]).css("z-index","100")
        jQuery(image_list[1][0]).css("z-index","50")
        jQuery(image_list[1][0]).fadeTo(0,1, function(){
        temp_img = image_list[0]
        image_list.push(temp_img)
        image_list.shift()
        ok_click = true
        })   
    })
    }
})

jQuery("#left_click").on('click', function(){
    if(ok_click == true){
        ok_click = false
        jQuery(image_list[2][0]).css("z-index","25")
        jQuery(image_list[0][0]).css("z-index","50")
        if(image_list[0][1] - 1 >= 0){
        image_list[2][1] = image_list[0][1] - 1
        }else if(image_list[0][1] - 1 == -1){
            image_list[2][1] =img_list.length -1
        }
        jQuery(image_list[2][0]).attr("src",img_list[image_list[2][1]])
        jQuery(image_list[1][0]).fadeTo(500,0, function(){
            jQuery(image_list[0][0]).css("z-index","100")
            jQuery(image_list[1][0]).css("z-index","50")
            jQuery(image_list[1][0]).fadeTo(0,1, function(){
                temp_img = image_list[2]
                image_list.unshift(temp_img)
                image_list.pop()
                ok_click = true
            })
        })

    }
})

//////////////////////////////////////////////////////////////////////

function gallery_initialize_mobile(callback){
    var parent = document.getElementById("gallery")
    for(var x = 0; x<all_img_list.length; x++){
        div = document.createElement('div')
        div.className = "gallery_display_mobile"
        div.id = "gallery_" + (x+1).toString()
        div1 = document.createElement('div')
        div1.className = "img_containter_mobile"
        div1.style.height = ((viewheight +5)/2.5).toString() + "px"
        div.style.height = ((viewheight +5)/2.5).toString() + "px"
        img = document.createElement('img')
        img.className = "gallery_image"
        img.src = all_img_list[x][0]
        p = document.createElement('p')
        p2 = document.createElement('p')
        p.innerHTML = gallery_names[x*2]
        p2.innerHTML = gallery_names[x*2]
        p.className = "gallery_words_mobile"
        p2.className = "gallery_words2"
        cover = document.createElement('div')
        cover.className = "gallery_cover_mobile"
        div1.appendChild(img)
        cover.appendChild(p2)
        div1.appendChild(cover)
        div1.appendChild(p)
        div.appendChild(div1)
        parent.appendChild(div)
    }
    div = document.createElement('div')
    div.className = "spacer"
    parent.appendChild(div)
    jQuery("#gallery").css("min-height", jQuery(window.top).height())
    callback()
}


jQuery("#right_scroll_mobile").on('click', function(){
    if(ok_click == true){
    ok_click = false
    jQuery(image_list[0][0]).css("z-index","25")
    jQuery(image_list[2][0]).css("z-index","50")
    image_list[0][1]  = (image_list[0][1] + 3)%img_list.length
    jQuery(image_list[0][0]).attr("src",img_list[image_list[0][1]])
    jQuery(image_list[1][0]).fadeTo(500,0, function(){
        jQuery(image_list[2][0]).css("z-index","100")
        jQuery(image_list[1][0]).css("z-index","50")
        jQuery(image_list[1][0]).fadeTo(0,1, function(){
        temp_img = image_list[0]
        image_list.push(temp_img)
        image_list.shift()
        ok_click = true
        })   
    })
    }
})

jQuery("#left_scroll_mobile").on('click', function(){
    if(ok_click == true){
        ok_click = false
        jQuery(image_list[2][0]).css("z-index","25")
        jQuery(image_list[0][0]).css("z-index","50")
        if(image_list[0][1] - 1 >= 0){
        image_list[2][1] = image_list[0][1] - 1
        }else if(image_list[0][1] - 1 == -1){
            image_list[2][1] =img_list.length -1
        }
        jQuery(image_list[2][0]).attr("src",img_list[image_list[2][1]])
        jQuery(image_list[1][0]).fadeTo(500,0, function(){
            jQuery(image_list[0][0]).css("z-index","100")
            jQuery(image_list[1][0]).css("z-index","50")
            jQuery(image_list[1][0]).fadeTo(0,1, function(){
                temp_img = image_list[2]
                image_list.unshift(temp_img)
                image_list.pop()
                ok_click = true
            })
        })
    }
})

jQuery(document).on('click', '.gallery_display_mobile', function(){
    if(viewer_on==false){
        jQuery("#viewer_img1_mobile").css("z-index", "50")
        jQuery("#viewer_img2_mobile").css("z-index", "100")
        jQuery("#viewer_img3_mobile").css("z-index", "25")
        jQuery("#viewer1_mobile").fadeTo(0,1)
    jQuery("#gallery").fadeTo(0,0, function(){
        jQuery("#viewer1_mobile").css("z-index", 100000000000)
    })
    jQuery('html, body').css('overflowY', 'hidden');
    viewer_on = true
    var id1 = jQuery(this).attr('id')
    var clicked_id = id1.replace("gallery_","")
    var z = parseInt(clicked_id)-1
    img_list = all_img_list[z]
    image_list = [["#viewer_img3_mobile",img_list.length-1],["#viewer_img2_mobile",0],["#viewer_img1_mobile",1]]
    for(var x = 0; x < image_list.length; x++){
        jQuery(image_list[x][0]).attr("src",img_list[image_list[x][1]])
    }
    }
})

jQuery("#return_x").on('click', function(){
    if(viewer_on == true){
    jQuery("#gallery").fadeTo(0,1)
    jQuery("#viewer1_mobile").fadeOut(0, function(){
        jQuery("#viewer1_mobile").css("z-index", -100000000000)
        if(jQuery(document).height()>jQuery(window).height()){
            jQuery('html, body').css('overflowY', 'auto');
        }
        viewer_on = false
        })
    }
})
