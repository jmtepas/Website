Photography Website designed by Ken DeBacker

Instructions for use:

There are three aspects to edit, the GalleryNames.txt file, the "galleries" folder, and the "home" folder.

1. GalleryNames.txt

                For each gallery, put the name of the gallery followed by a comma and then the number of photos in the gallery           

                Each gallery should have its own row, for example

                            Chicago, 3
                            New York, 7
                            Boston, 10

                Will make three galleries, named "Chicago", "New York", and "Boston", which contain 3,7,and 10 photos respectively.
                

2. "galleries" folder

                Each gallery in the folder must be named "gallery_X" where X is a number.
                
                The gallery number corresponds to the gallery's row in the GalleryNames.txt file. 
                
                For example, if the "galleries" folder contained
                
                          gallery_1, gallery_2, gallery_3
                          
                gallery_1 corresponds to "Chicago" and should have 3 photos in it, gallery two corresponds to "New York", and so on
                
                The numbering must start at one and go up by one for each additional gallery, not doing so will trigger an error.
                
                The following folders will trigger an error:
                
                          gallery_2, gallery_3, gallery_4
                         
                          gallery_1, gallery_3, gallery_4
                          
                          
                Within each gallery folder, the image names must be numbers, starting from the number 1 and going up 1 for each
                
                additional image, note that the image "1" will be the first image shown in addition to the image displayed as the 
                
                face of the gallery. 
                
                NOTE: images must be .jpg or .png
                
                
3. "home" folder

                The home folder is where to put images you would like displayed on the loading screen
                
                Label the images as "1", "2", "3", etc. 
                
                Image 1 will be shown initially, and others will be cycled through in the order they are numbered.
                
             
                
                

