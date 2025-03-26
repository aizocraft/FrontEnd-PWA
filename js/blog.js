 function myFunction() {
              var dots = document.getElementById("dots");
              var moreText = document.getElementById("more");
              var btnText = document.getElementById("myBtn");
              var main = document.getElementById("main");
              var coimg = document.getElementById("coimg");
              
              // Get the position of the blogborehole section
              var boreholeSection = document.getElementById("blogborehole");
              var boreholeSectionPosition = boreholeSection.getBoundingClientRect().top;
              // Get the current scroll position
              var currentPosition = window.pageYOffset || document.documentElement.scrollTop;
              
              if (dots.style.display === "none") {
                  dots.style.display = "inline";
                  btnText.innerHTML = "Read more";
                  moreText.style.display = "none";
                  main.style.display = "flex";
                  coimg.style.width = "350px";
                  
                  // Scroll back to the blogborehole section
                  window.scrollTo({
                      top: currentPosition + boreholeSectionPosition,
                      behavior: 'smooth'
                  });
                  
              } else {
                  dots.style.display = "none";
                  btnText.innerHTML = "Read less";
                  moreText.style.display = "inline";
                  main.style.display = "block";
                  coimg.style.width = "100%";
                  coimg.style.transition = "all 1s";
              }
          }

          function myFunction1() {
            var dots = document.getElementById("dots1");
            var moreText = document.getElementById("more1");
            var btnText = document.getElementById("myBtn1");
            var main = document.getElementById("main1");
            var coimg = document.getElementById("coimg1");
            
            // Get the position of the blogborehole section
            var boreholeSection = document.getElementById("blogsolar");
            var boreholeSectionPosition = boreholeSection.getBoundingClientRect().top;
            // Get the current scroll position
            var currentPosition = window.pageYOffset || document.documentElement.scrollTop;
            
            if (dots.style.display === "none") {
                dots.style.display = "inline";
                btnText.innerHTML = "Read more";
                moreText.style.display = "none";
                main.style.display = "flex";
                coimg.style.width = "350px";
                
                // Scroll back to the blogborehole section
                window.scrollTo({
                    top: currentPosition + boreholeSectionPosition,
                    behavior: 'smooth'
                });
                
            } else {
                dots.style.display = "none";
                btnText.innerHTML = "Read less";
                moreText.style.display = "inline";
                main.style.display = "block";
                coimg.style.width = "100%";
                coimg.style.transition = "all 1s";
            }
        }



        function myFunction2() {
            var dots = document.getElementById("dots2");
            var moreText = document.getElementById("more2");
            var btnText = document.getElementById("myBtn2");
            var main = document.getElementById("main2");
            var coimg = document.getElementById("coimg2");
            
            // Get the position of the blogborehole section
            var boreholeSection = document.getElementById("blogtower");
            var boreholeSectionPosition = boreholeSection.getBoundingClientRect().top;
            // Get the current scroll position
            var currentPosition = window.pageYOffset || document.documentElement.scrollTop;
            
            if (dots.style.display === "none") {
                dots.style.display = "inline";
                btnText.innerHTML = "Read more";
                moreText.style.display = "none";
                main.style.display = "flex";
                coimg.style.width = "350px";
                
                // Scroll back to the blogborehole section
                window.scrollTo({
                    top: currentPosition + boreholeSectionPosition,
                    behavior: 'smooth'
                });
                
            } else {
                dots.style.display = "none";
                btnText.innerHTML = "Read less";
                moreText.style.display = "inline";
                main.style.display = "block";
                coimg.style.width = "100%";
                coimg.style.transition = "all 1s";
            }
        }