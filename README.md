Personal Photography Website Template made by Ken DeBacker

Instructions for use:

There are three aspects to edit, the GalleryNames.txt file, the "galleries" folder, and the "home" folder.


1. GalleryNames.txt
                
                a. Put the text you would like displayed on the home page button on the first line after "Home Button Text:".
                
                b. On the 3rd line, if you would like a logo put "True" after "Logo:", if you don't want a logo image included,
                  
                    put "False". If you would like a logo, upload your personal logo into the "logos" folder, label the home page logo
                    
                    "logo1" and the gallery page logo "logo2." 
                    
                    IMPORTANT NOTE: Logo images must be in ".png" file form.
                    
                c. List the image types (not counting "png" for the logos if none of your other images are of the .png type) you are going to 
                
                    upload after "Image Types (Don't include the "."):" on the 5th line, make sure to seperate them with a comma, and do not
                    
                    include the "." in the image type.    

                d. For each gallery, put the name of the gallery followed by a comma and then the number of photos in the gallery           

                    Each gallery should have its own row, for example

                            Chicago, 3
                            New York, 7
                            Boston, 10

                    Will make three galleries, named "Chicago", "New York", and "Boston", which contain 3,7,and 10 photos respectively.
                    
                    Start these gallery rows on the line directly under "Galleries (put them immediately below this line):"
                    
                    IMPORTANT NOTE: Please do not include commas in your gallery titles, as this will cause an error.
                    
               e. An example of a correctly done GalleryNames.txt setup file is shown below:
               
                     Home Button Text: Welcome to My Webpage!
                     -----------------------------------
                     Logo: True
                     -----------------------------------
                     Image Types (Don't include the "."): png, jpg, jpeg
                     ------------------------------------
                     Galleries (put them immediately below this line):
                     Yosemite, 10
                     Half Moon Beach, 5
                     Long Island, 15
                     Boston, 5
                     Wisconsin Camping, 7
                     Salmon Fishing, 25
               
               
                

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
                
                
3. "home" folder

                The home folder is where to put images you would like displayed on the loading screen
                
                Label the images as "1", "2", "3", etc. 
                
                Image 1 will be shown initially, and others will be cycled through in the order they are numbered.
                
             
                
                

