var quiz = [
	        {
	            "question"      :   "1 - Qual o resultado da seguinte subtração	?",
	            "image"         :   "https://class.daytonastate.edu/d2l/common/viewFile.d2lfile/Database/MzIzMTk0NQ/cet3116_fex_FA13fin.png?ou=285721",
	            "choices"       :   [
	                                    "110011",
	                                    "111011",
	                                    "111001",
	                                    "110110",
	                                ],
	            "correct"       :   "110011",
	            "explanation"   :   "",
	        },
	        {
	            "question"      :   "2 - Teste2?",
	            "image"         :   "",
	            "choices"       :   [
	                                    "Opt 1",
	                                    "Opt 2",
	                                    "Opt 3",
	                                    "Opt 4"
	                                ],
	            "correct"       :   "Opt 2",
	            "explanation"   :   "Pq opt2",
	        },
	        {
	            "question"      :   "3 - Teste3?",
	            "image"         :   "",
	            "choices"       :   [
	                                    "Opt 1",
	                                    "Opt 2",
	                                    "Opt 3",
	                                    "Opt 4"
	                                ],
	            "correct"       :   "Opt 3",
	            "explanation"   :   "Pq opt3",
	        },
	    ];
	    
	    /******* No need to edit below this line *********/
	    var currentquestion = 0, score = 0, submt=true, picked;
	    jQuery(document).ready(function($){
	        /**
	         * HTML Encoding function for alt tags and attributes to prevent messy
	         * data appearing inside tag attributes.
	         */
	        function htmlEncode(value){
	          return $(document.createElement('div')).text(value).html();
	        }
	        /**
	         * This will add the individual choices for each question to the ul#choice-block
	         *
	         * @param {choices} array The choices from each question
	         */
	        function addChoices(choices){
	            if(typeof choices !== "undefined" && $.type(choices) == "array"){
	                $('#choice-block').empty();
	                for(var i=0;i<choices.length; i++){
	                    $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');                    
	                }
	            }
	        }
	        
	        /**
	         * Resets all of the fields to prepare for next question
	         */
	        function nextQuestion(){
	            submt = true;
	            $('#explanation').empty();
	            $('#question').text(quiz[currentquestion]['question']);
	            $('#pager').text('Questões ' + Number(currentquestion + 1) + ' de ' + quiz.length);
	            if(quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != ""){
	                if($('#question-image').length == 0){
	                    $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question'])).insertAfter('#question');
	                } else {
	                    $('#question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question']));
	                }
	            } else {
	                $('#question-image').remove();
	            }
	            addChoices(quiz[currentquestion]['choices']);
	            setupButtons();
	        }
	        /**
	         * After a selection is submitted, checks if its the right answer
	         *
	         * @param {choice} number The li zero-based index of the choice picked
	         */
	        function processQuestion(choice){
	            if(quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']){
	                $('.choice').eq(choice).css({'background-color':'#b3ffb3'});
	                $('#explanation').html('<strong>Correto!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
	                score++;
	            } else {
	                $('.choice').eq(choice).css({'background-color':'#ffb3b3'});
	                $('#explanation').html('<strong>Errado!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
	            }
	            currentquestion++;
	            $('#submitbutton').html('Próxima Questão').on('click', function(){
	                if(currentquestion == quiz.length){
	                    endQuiz();
	                } else {
	                    $(this).text('Ver resposta').css({'color':'#fff'}).off('click');
	                    nextQuestion();
	                }
	            })
	        }
	        /**
	         * Sets up the event listeners for each button.
	         */
	        function setupButtons(){
	            $('.choice').on('mouseover', function(){
	                $(this).css({'background-color':'#e1e1e1'});
	            });
	            $('.choice').on('mouseout', function(){
	                $(this).css({'background-color':'#fff'});
	            })
	            $('.choice').on('click', function(){
	                picked = $(this).attr('data-index');
	                $('.choice').removeAttr('style').off('mouseout mouseover');
	                $(this).css({'border-color':'#fff','font-weight':700,'background-color':'#c1c1c1'});
	                if(submt){
	                    submt=false;
	                    $('#submitbutton').css({'color':'#000'}).on('click', function(){
	                        $('.choice').off('click');
	                        $(this).off('click');
	                        processQuestion(picked);
	                    });
	                }
	            })
	        }
	        
	        /**
	         * Quiz ends, display a message.
	         */
	        function endQuiz(){
	            $('#explanation').empty();
	            $('#question').empty();
	            $('#choice-block').empty();
	            $('#submitbutton').remove();
	            $('#question').text("Você acertou " + score + " de " + quiz.length + " questões.");
	        }
	        /**
	         * Runs the first time and creates all of the elements for the quiz
	         */
	        function init(){
	            //add pager and questions
	            if(typeof quiz !== "undefined" && $.type(quiz) === "array"){
	                //add first question
	                $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');
	                //add image if present
	                if(quiz[0].hasOwnProperty('image') && quiz[0]['image'] != ""){
	                    $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#frame');
	                }
	                $(document.createElement('p')).addClass('explanation').attr('id','explanation').html('&nbsp;').appendTo('#frame');
	            
	                //questions holder
	                $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');
	            
	                //add choices
	                addChoices(quiz[0]['choices']);
	            
	                //add submit button
	                $(document.createElement('div')).addClass('choice-box btn-info').attr('id', 'submitbutton').text('Ver resposta').css({'font-weight':800,'color':'#FFF','padding':'20px 0'}).appendTo('#frame');
	            	
	               	//add pager
	                $(document.createElement('p')).addClass('pager').attr('id','pager').text('Questão 1 de ' + quiz.length).appendTo('#frame');

	                setupButtons();
	            }
	        }
	        
	        init();
	    });