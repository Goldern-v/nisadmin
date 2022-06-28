import $ from 'jquery'
import { saveAs } from 'file-saver';

let wordExport=function(fileName){    
  fileName = typeof fileName !== 'undefined' ? fileName : "jQuery-Word-Export";        
  var staticInfo = {            
    mhtml: {                
      top: "Mime-Version: 1.0\nContent-Base: " + window.location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + window.location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",                head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n",                
      body: "<body>_body_</body>"            
    }        
  };        
  var options = {            
    maxWidth: 624        
  };        // Clone selected element before manipulating it  
  // const node = document.getElementById('exportWord')
  // console.log(node);      
  var markup = $('#exportWord').clone();        // Remove hidden elements from the output        
  markup.each(function() {            
    var self = $(this);            
    if (self.is(':hidden'))                
    self.remove();        
  });        
  // Embed all images using Data URLs        
  var images = [];        
  var img = markup.find('img');        
  for (var i = 0; i < img.length; i++) {            
    // Calculate dimensions of output image           
     var w = Math.min(img[i].width, options.maxWidth);            
     var h = img[i].height * (w / img[i].width);            
     // Create canvas for converting image to data URL            
     var canvas = document.createElement("CANVAS");            
     canvas.width = w;            
     canvas.height = h;            
     // Draw image to canvas            
     var context = canvas.getContext('2d');            
     context.drawImage(img[i], 0, 0, w, h);            
     // Get data URL encoding of image            
     var uri = canvas.toDataURL("image/png");           
      $(img[i]).attr("src", img[i].src);            
      img[i].width = w;            
      img[i].height = h;            
      // Save encoded image to array            
      images[i] = {                
        type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),                
        encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),                
        location: $(img[i]).attr("src"),                
        data: uri.substring(uri.indexOf(",") + 1)            
      };        
    }        
    // Prepare bottom of mhtml file with image data        
    var mhtmlBottom = "\n";        
    for (var item = 0; item < images.length; item++) {            
      mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";            
      mhtmlBottom += "Content-Location: " + images[item].location + "\n";           
       mhtmlBottom += "Content-Type: " + images[item].type + "\n";            
       mhtmlBottom += "Content-Transfer-Encoding: " + images[item].encoding + "\n\n";            
       mhtmlBottom += images[item].data + "\n\n";        
      }        
      mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";        
      //TODO: load css from included stylesheets        
      var styles = ".QuestionList__Wrapper-hpdbrf-0{margin: 30px auto; background: #fff; padding: 50px;min-height: 800px; border: 1px solid #e8e8e8; width:500px;} .main-title{font-size: 40px;color: #000;font-weight: bold;text-align: center;margin-bottom: 15px;}  .test-info{padding: 15px 0;overflow: hidden;} .test-info-item{width: 300px;padding-left: 15px;padding-right: 15px;display: inline-block;} ";  
      // Aggregate parts of the file together        
      var fileContent = staticInfo.mhtml.top.replace("_html_", staticInfo.mhtml.head.replace("_styles_", styles) + staticInfo.mhtml.body.replace("_body_", markup.html())) + mhtmlBottom;       
      console.log(fileContent); 
      // Create a Blob with the file contents        
      var blob = new Blob([fileContent], {            
        type: "application/msword;charset=utf-8"        
      });        
      saveAs(blob, fileName + ".doc");    
    }
    export default wordExport;

