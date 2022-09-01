let gallery_names = ["Soaring",3,"Flying",3, "Something",3]
let home_img_list = []
let all_img_list = [["home/1.jpeg","home/1.jpeg","home/1.jpeg","home/1.jpeg","home/1.jpeg","home/1.jpeg"],["home/2.JPG","home/2.JPG","home/2.JPG","home/2.JPG","home/2.JPG","home/2.JPG"],["home/3.jpeg","home/3.jpeg","home/3.jpeg"]]
let img_list = []
let viewer_on
let image_types = []
let on_home = true
let home_pic = 0 
let home_img = "#home_img1"
let mobile = false
let viewheight

document.addEventListener("DOMContentLoaded", ()=>{
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        document.getElementById("loading_page").style.display = "none"
        setTimeout("document.getElementById('loading_page_mobile').src=document.getElementById('loading_page_mobile').src",10)
    }
    else{
        document.getElementById("loading_page_mobile").style.display = "none"
        setTimeout("document.getElementById('loading_page').src=document.getElementById('loading_page').src",10)
    }
    initialize()
})

const go_gallery=()=>{
    current_pic = 0
    $("#gallery").fadeIn(0).fadeTo(0,0)
    $("#home").fadeOut(500, ()=>{
        $('html, body').css('overflowY', 'auto');
        $("#gallery").fadeTo(500,1)
        viewer_on = false 
        on_home = false
    })
}

const check_src = (src1)=>{
    let ok = true
    $.ajax({
        url: src1,
        type: "HEAD",
        async: false,
        error: ()=>{
             ok = false
        },
        success: ()=>{
            ok = true
        }
    });
    return ok
} 

const home_changer=()=>{
    if(on_home === true){
        if(home_img==="#home_img1"){
            $(home_img).delay(7000).fadeTo(2000,0,()=>{
                home_pic = (home_pic + 2)%home_img_list.length
                $(home_img).attr("src", home_img_list[home_pic])
                $(home_img).css("z-index", 25)
                $(home_img).fadeTo(0,1, ()=>{
                    home_img = "#home_img2"
                    $(home_img).css("z-index", 50)
                    home_changer()
                })
            })
        }else{
            $(home_img).delay(7000).fadeTo(2000,0,()=>{
                home_pic = (home_pic + 2)%home_img_list.length
                $(home_img).attr("src", home_img_list[home_pic])
                $(home_img).css("z-index", 25)
                $(home_img).fadeTo(0,1, ()=>{
                    home_img = "#home_img1"
                    $(home_img).css("z-index", 50)
                    home_changer()
                })
            })
        }
    }
}

const set_up_home = ()=>{
    let proceed = true
    let x = 1
    while(proceed === true){
        for(let y=0; y<image_types.length; y++){
            let path1 = `home/${x.toString()}.${image_types[y].replace(" ","")}`
            if(check_src(path1)===true){
                home_img_list.push(path1)
                if(x ===1){
                    $("#home_img1").attr("src", path1)
                }else if(x===2){
                    $("#home_img2").attr("src", path1)
                }
                break 
            }
            else if(y === image_types.length -1){
                proceed = false
            }
        }
        x++
    }
}

const set_up_gallery = (callback)=>{
    all_img_list = []
    for(let x = 0; x<gallery_names.length/2; x++){
        let x_temp = x +1
        let path = `galleries/gallery_${x_temp.toString()}`
        all_img_list.push([])
        let temp_limit = parseInt(gallery_names[x*2+1])
        for(let y = 0; y<temp_limit; y++){
            let y_temp = y +1
            let found = false
            for(let z=0; z<image_types.length-1; z++){
                let path1 = `${path}/${y_temp.toString()}.${image_types[z].replace(" ","")}`
                if(check_src(path1)===true){
                    all_img_list[x].push(path1)
                    found = true
                    break 
                }
            }
            if(found ===false){
                let path1 = `${path}/${y_temp.toString()}.${image_types[image_types.length-1].replace(" ","")}`
                all_img_list[x].push(path1)
            }
        }
    }
    callback()
}


const gallery_initialize = (callback)=>{
    let parent = document.getElementById("gallery")
    for(let x = 0; x<all_img_list.length; x++){
        div = document.createElement('div')
        div.className = "gallery_display"
        div.id = `gallery_${(x+1).toString()}`
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
    $("#gallery").css("min-height", $(window.top).height())
    callback()
}

const launcher=()=>{
    $("#loader_page").fadeOut(0, ()=>{
        $("#home").fadeTo(3000,1, ()=>{
            home_changer()
        })
    })
}

$(window).resize(()=>{
    $("#gallery").css("min-height", $(window.top).height())
})

const retrieve_names = (callback)=>{
    $.ajax({
        url: "GalleryNames.txt",
        type: "GET",
        async: false,
        error: ()=>{
             alert("Problem Loading Gallery Names")
        },
        success: (names)=>{
            let names1 = names.split("\n");
            let home_text = names1[0].split("Button Text:")[1]
            document.getElementById("home_button").innerHTML = home_text
            let logo_text = names1[2].split(":")[1]
            logo_text = logo_text.replace(" ", "")
            if(logo_text==="False" || logo_text ==="FALSE" || logo_text ==="false"){
                document.getElementById("home_logo1").style.display = "none"
                document.getElementById("gal_logo").style.display = "none"
            }
            image_types = names1[4].split(":")[1].split(",")
            let total1 = []
            for(let x = 7; x<names1.length; x++){
                let temp = names1[x].split(",")
                for(let y = 0; y<temp.length; y++){
                    if(temp[y] !== "" && temp[y]!==' '){
                        let temp2 = temp[y]
                        if(y===1){
                            temp2 =temp2.replace(" ","")
                        }
                        total1.push(temp2)
                    }
                }
            }
            gallery_names = total1
        }
    });
    callback()
}

const initialize=()=>{
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        mobile = true
        viewheight = parseInt(window.innerHeight)
        document.getElementById("viewer1_mobile").style.height = `${viewheight.toString()}px`
        document.getElementById("viewer1_mobile").style.marginTop = `${(-1 * viewheight/2).toString()}px`
        document.getElementById("loading_page").style.display = "none"
        document.getElementById("home_logo1").className="home_logo_mobile"
        document.getElementById("gal_logo").className="gal_logo_mobile"
        document.getElementById("home_button").className="home_button_mobile"
        document.getElementById("viewer1").style.display = "none"
        setTimeout( ()=> {
            retrieve_names(()=>{
                set_up_home()
                set_up_gallery(()=>{
                    gallery_initialize_mobile(()=>{
                        launcher()
                    })
                })
            })
        },0)
      } else {
        document.getElementById("viewer1_mobile").style.display = "none"
        document.getElementById("loading_page_mobile").style.display = "none"
        mobile = false
        setTimeout(()=> {
            retrieve_names(()=>{
                set_up_home()
                set_up_gallery(()=>{
                    gallery_initialize(()=>{
                        launcher()
                    })
                })
            })
        },0)
      }
    
}


const initialize1 =()=>{
    viewheight = parseInt(window.innerHeight)
    document.getElementById("viewer1_mobile").style.marginTop = `${(-1 * viewheight/2).toString()}px`
}


$(document).on('click', '.gallery_display', ()=>{
    if(viewer_on===false){
        $("#viewer_img1").css("z-index", "50")
    $("#viewer_img2").css("z-index", "100")
    $("#viewer_img3").css("z-index", "25")
    $("#viewer1").fadeTo(0,1)
    $("#gallery").fadeTo(250,0, ()=>{
        $("#viewer1").css("z-index", 1000000000000)
    })
    $('html, body').css('overflowY', 'hidden');
    viewer_on = true
    let id1 = $(this).attr('id')
    let clicked_id = id1.replace("gallery_","")
    let z = parseInt(clicked_id)-1
    img_list = all_img_list[z]
    image_list = [["#viewer_img3",img_list.length-1],["#viewer_img2",0],["#viewer_img1",1]]
    for(let x = 0; x < image_list.length; x++){
        $(image_list[x][0]).attr("src",img_list[image_list[x][1]])
    }
    $("#viewer_img3").hide().show()
    $("#viewer_img1").hide().show()
    }
})

$("#x3").on('click', ()=>{
    if(viewer_on === true){
    $("#gallery").fadeTo(0,1)
    $("#viewer1").fadeTo(250,0,  ()=>{
        $("#viewer1").css("z-index", -10000000000000)
        if($(document).height()>$(window).height()){
           $('html, body').css('overflowY', 'auto');
        }
        viewer_on = false
        })
    }
})



let ok_click = true
let current_pic = 0
let image_list = []

$("#right_click").on('click', ()=>{
    if(ok_click === true){
    ok_click = false
    $(image_list[0][0]).css("z-index","25")
    $(image_list[2][0]).css("z-index","50")
    image_list[0][1]  = (image_list[0][1] + 3)%img_list.length
    $(image_list[0][0]).attr("src",img_list[image_list[0][1]])
    $(image_list[1][0]).fadeTo(250,0, ()=>{
        $(image_list[2][0]).css("z-index","100")
        $(image_list[1][0]).css("z-index","50")
        $(image_list[1][0]).fadeTo(0,1, ()=>{
        temp_img = image_list[0]
        image_list.push(temp_img)
        image_list.shift()
        ok_click = true
        })   
    })
    }
})

$("#left_click").on('click', ()=>{
    if(ok_click === true){
        ok_click = false
        $(image_list[2][0]).css("z-index","25")
        $(image_list[0][0]).css("z-index","50")
        if(image_list[0][1] - 1 >= 0){
        image_list[2][1] = image_list[0][1] - 1
        }else if(image_list[0][1] - 1 === -1){
            image_list[2][1] =img_list.length -1
        }
        $(image_list[2][0]).attr("src",img_list[image_list[2][1]])
        $(image_list[1][0]).fadeTo(250,0, ()=>{
            $(image_list[0][0]).css("z-index","100")
            $(image_list[1][0]).css("z-index","50")
            $(image_list[1][0]).fadeTo(0,1, ()=>{
                temp_img = image_list[2]
                image_list.unshift(temp_img)
                image_list.pop()
                ok_click = true
            })
        })

    }
})

//////////////////////////////////////////////////////////////////////

const gallery_initialize_mobile=(callback)=>{
    let parent = document.getElementById("gallery")
    for(let x = 0; x<all_img_list.length; x++){
        div = document.createElement('div')
        div.className = "gallery_display_mobile"
        div.id = `gallery_${(x+1).toString()}`
        div1 = document.createElement('div')
        div1.className = "img_containter_mobile"
        div1.style.height = `${((viewheight +5)/2.5).toString()}px`
        div.style.height = `${((viewheight +5)/2.5).toString()}px`
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
    $("#gallery").css("min-height", $(window.top).height())
    callback()
}


$("#right_scroll_mobile").on('click', ()=>{
    if(ok_click === true){
    ok_click = false
    $(image_list[0][0]).css("z-index","25")
    $(image_list[2][0]).css("z-index","50")
    image_list[0][1]  = (image_list[0][1] + 3)%img_list.length
    $(image_list[0][0]).attr("src",img_list[image_list[0][1]])
    $(image_list[1][0]).fadeTo(250,0, ()=>{
        $(image_list[2][0]).css("z-index","100")
        $(image_list[1][0]).css("z-index","50")
        $(image_list[1][0]).fadeTo(0,1, ()=>{
        temp_img = image_list[0]
        image_list.push(temp_img)
        image_list.shift()
        ok_click = true
        })   
    })
    }
})

$("#left_scroll_mobile").on('click', ()=>{
    if(ok_click === true){
        ok_click = false
        $(image_list[2][0]).css("z-index","25")
        $(image_list[0][0]).css("z-index","50")
        if(image_list[0][1] - 1 >= 0){
        image_list[2][1] = image_list[0][1] - 1
        }else if(image_list[0][1] - 1 === -1){
            image_list[2][1] =img_list.length -1
        }
        $(image_list[2][0]).attr("src",img_list[image_list[2][1]])
        $(image_list[1][0]).fadeTo(250,0, ()=>{
            $(image_list[0][0]).css("z-index","100")
            $(image_list[1][0]).css("z-index","50")
            $(image_list[1][0]).fadeTo(0,1, ()=>{
                temp_img = image_list[2]
                image_list.unshift(temp_img)
                image_list.pop()
                ok_click = true
            })
        })
    }
})

$(document).on('click', '.gallery_display_mobile', ()=>{
    if(viewer_on===false){
        $("#viewer_img1_mobile").css("z-index", "50")
        $("#viewer_img2_mobile").css("z-index", "100")
        $("#viewer_img3_mobile").css("z-index", "25")
        $("#viewer1_mobile").fadeTo(0,1)
    $("#gallery").fadeTo(250,0, ()=>{
        $("#viewer1_mobile").css("z-index", 100000000000)
    })
    $('html, body').css('overflowY', 'hidden');
    viewer_on = true
    let id1 = $(this).attr('id')
    let clicked_id = id1.replace("gallery_","")
    let z = parseInt(clicked_id)-1
    img_list = all_img_list[z]
    image_list = [["#viewer_img3_mobile",img_list.length-1],["#viewer_img2_mobile",0],["#viewer_img1_mobile",1]]
    for(let x = 0; x < image_list.length; x++){
        $(image_list[x][0]).attr("src",img_list[image_list[x][1]])
    }
    $("#viewer_img3").hide().show()
    $("#viewer_img1").hide().show()
    }
})

$("#return_x").on('click', ()=>{
    if(viewer_on === true){
    $("#gallery").fadeTo(0,1)
    $("#viewer1_mobile").fadeTo(250,0, ()=>{
        $("#viewer1_mobile").css("z-index", -100000000000)
        if($(document).height()>$(window).height()){
            $('html, body').css('overflowY', 'auto');
        }
        viewer_on = false
        })
    }
})
