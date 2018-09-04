$(document).ready(function () {

    var questionsArray = [
                    { question: "What tune is this?",
                    answers: ["Brown Rice by Don Cherry",
                    "Eternal Rhythm by Don Cherry",
                    "Space Is the Place by Sun Ra",
                    "Thembi by Pharoah Sanders"],
                    ca: "Brown Rice by Don Cherry",song: "01.mp3" },

                    {question: "What tune is this?",
                    answers: ["Ghost Variations pt. 1 by Albert Ayler",
                    "Fiesta by Archie Shepp",
                    "Congeniality by Ornette Coleman",
                    "Spirits Rejoice by Albert Ayler"],
                    ca: "Ghost Variations pt. 1 by Albert Ayler", song: "02.mp3"
                    },

                    { question: "What tune is this?",
                    answers: ["Giant Steps by John Coltrane",
                    "Moanin\' by Art Blakey",
                    "Shadow Waltz by Sonny Rollins",
                    "Blue Bossa by Joe Henderson"],
                    ca: "Giant Steps by John Coltrane", song: "03.mp3" },

                    { question: "What tune is this?",
                    answers:
                    ["My Favorite Things by John Coltrane",
                    "My Favorite Things by Alice Coltrane",
                    "My Favorite Things by Herb Alpert and the Tijuana Brass",
                    "My Favorite Things by George Shearing"],
                    ca: "My Favorite Things by John Coltrane", song: "04.mp3" },

                    { question: "What tune is this?",
                    answers:
                    ["Black Fire by Andrew Hill",
                    "Contours by Sam Rivers",
                    "The Pleasure Is Mine by Herbie Hancock",
                    "It Never Entered My Mind by Keith Jarrett"],
                    ca: "Black Fire by Andrew Hill", song: "05.mp3" },

                    { question: "What tune is this?",
                    answers:
                    ["Lonely Women by Ornette Coleman",
                    "Eventually by Ornette Coleman",
                    "Peace by Ornette Coleman",
                    "Focus On Sanity by Ornette Coleman"],
                    ca: "Peace by Ornette Coleman", song: "06.mp3" },

                    { question: "What tune is this?",
                    answers:
                    ["Take Two by Dave Brubeck",
                    "Take Three by Dave Brubeck",
                    "Take Four by Dave Brubeck",
                    "Take Five by Dave Brubeck"],
                    ca: "Take Five by Dave Brubeck", song: "07.mp3" },

                    { question: "What tune is this?", 
                    answers: 
                    ["Waltz For Debby by Bill Evans", 
                    "Green In Blue by Miles Davis", 
                    "But Not For Me by Ahmad Jamal", 
                    "Mode To John by Mccoy Tyner"],
                    ca: "Waltz For Debby by Bill Evans", song: "08.mp3" },

                    { question: "What tune is this?",
                    answers:
                    ["Beatrice by Sam Rivers",
                    "Four Winds by Dave Holland Quartet",
                    "N-M488-44M-Z by Anthony Braxton",
                    "Spectrum by Andrew Hill"], 
                    ca: "Beatrice by Sam Rivers", song: "09.mp3" },
                ];

                var questions = [];

                var inc = 0;
                var timer;

                var winCount = 0;
                var loseCount = 0;
                var unanswered = 0;

                var answerTime;
                var questionTime;

                var counts;
                var timeleft;

                var vol = 1;

                $("#questionBlock").hide();
                $("#start").click(initialize);
                $("#startOver").hide();
                $("#startOver").click(initialize);

                $("#answerBlock").hide();
                $("#overBlock").hide();


                function initialize() {
                    var randomQuestionsArray = [];
                    questions = [];
                    inc = 0;
                    winCount = 0;
                    loseCount = 0;
                    unanswered = 0;

                    $("#correct").html(winCount);
                    $("#incorrect").html(loseCount);

                    $("#overBlock").hide();
                    $("#answerBlock").hide();

                    $("#start").hide();
                    $("#bg").css('background-image', "url(assets/images/3.gif)");

                    randomQuestionsArray = questionsArray.slice(0);

                    for (i = 0; i < questionsArray.length; i++) {
                        let random = Math.floor(((Math.random()) * randomQuestionsArray.length));
                        questions.push(randomQuestionsArray.splice(random, 1));
                    };

                    nextQuestion();
                }
                

                
                function nextQuestion() {

                    document.getElementById("sound").volume = 1;
                    console.log(document.getElementById("sound").volume);

                    if (inc < questions.length) {

                        questionTime = setTimeout(nextAnswer, 1000 * 30);

                        var randomArray = [];

                        randomArray = questions[inc][0].answers.slice(0);
                        $("#question").text(questions[inc][0].question);

                        for (j in questions[inc][0].answers) {
                            let random = Math.floor(((Math.random()) * randomArray.length));
                            $("#q" + j).text(randomArray.splice(random, 1));
                        };

                        $("#sound").attr("src", "assets/sounds/" + questions[inc][0].song);

                        $("#questionBlock").show();
                        $("#answerBlock").hide();

                        timer(30);
                        count();
                       
                    } else {
                        over();
                        reset();
                    }
                };

                function timer(timess){
                    timeleft = timess;
                    $("#time").show();
                }

                function count(){
                    
                    $("#time").html(timeleft);
                    timeleft--;
                    
                    if(timeleft < 0){
                        clearInterval(counts);
                        unanswered++;
                        $("#time").hide();
                    }
                    else {counts = setTimeout(count, 1000);}
                }

                function nextAnswer(seconds = 10){
                    console.log("inc is " + inc);
                    
                    answerTime = setTimeout(nextQuestion, 1000 * seconds);

                    $("#time").hide();
                    $("#questionBlock").hide();
                    $("#answerBlock").show();
                    $("#rw").text("Unanswered");
                    $("#theAnswer").html(" " + questions[inc][0].ca);

                    inc++;

                    function fadeOut() {
                        if (vol > .2 && inc < questions.length){
                            document.getElementById("sound").volume = vol.toFixed(2);
                            vol -= 0.1;
                            console.log(document.getElementById("sound").volume);
                            setTimeout(fadeOut, 1000);
                        }
                        else{
                            vol = 1;
                            clearInterval(fadeO);
                        }
                    }

                    var fadeO = setTimeout(fadeOut, 1000);
                    
                }

                function reset(){
                    clearInterval(answerTime);
                    clearInterval(questionTime);
                    clearInterval(counts);
                }

                function over(){
                    $("#overBlock").show();
                    $("#answerBlock").hide();
                    $("#unanswered").html(unanswered);
                    $("#correct").html(winCount);
                    $("#incorrect").html(loseCount);
                    $("#startOver").show();
                    $("#bg").css('background-image', "url(assets/images/1.gif)");

                }

                $(".answers").click(function () {
                    let answerIndex = $(this).html();
                    console.log(answerIndex);
                    console.log(questions[inc][0].ca);
                    
                    clicked = true;

                    console.log("clicked " + answerIndex);

                    if (answerIndex === questions[inc][0].ca) {
                        winCount++;
                        console.log("yay");
                        reset();
                        nextAnswer()
                        $("#rw").text("Right!");

                    } else {
                        loseCount++;
                        console.log("nope");
                        reset();
                        nextAnswer()
                        $("#rw").text("Wrong!");

                    }
        });
});
