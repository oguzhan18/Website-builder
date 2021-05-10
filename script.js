var componentData = [
  {
    id: 1,
    name: "Tanıtım Kartı",
    icon: "picture_in_picture",
    description: "Tanıtım ile buton",
    html:
      '<br><div class="jumbotron container-fluid"><h1 class="display-4">Başlık</h1><p class="lead">Bilgiyi yaznız</p><a class="btn btn-primary btn" href="#" role="button">Buton</a></p></div>'
  },
  {
    id: 2,
    name: "Aralık",
    icon: "height",
    description: "Aralık Çizgi",
    html: '<br><div class = "builder-spacer"></div>'
  },
  {
    id: 3,
    name: "Başlık",
    icon: "format_size",
    description: "Sayfanın başlığını yazınız.",
    html:
      '<br><div class = "builder-header col col-8"><h2>Başlık</h2></div>'
  },
  {
    id: 4,
    name: "Metin",
    icon: "notes",
    description: "Metin",
    html:
    '<br><div class = "builder-text col col-lg-8"><p>Text types in literature form the basic styles of writing. Factual texts merely seek to inform, whereas literary texts seek to entertain or otherwise engage the reader by using creative language and imagery. There are many aspects to literary writing, and many ways to analyse it, but four basic categories are descriptive, narrative, expository, and argumentative.<p></div>'
  },
  {
    id: 5,
    name: "Button",
    icon: "play_circle_outline",
    description: "Button",
    html:
      '<br><div class = "builder-button col col-8"><button type="button" class="btn btn-primary">Button</button></div>'
  },
  {
    id: 6,
    name: "Cards",
    icon: "crop_portrait",
    description: "Tanıtım Cards",
    html:
      '<br><div class = "card-container col-centered"><div class="card" style="width: 18rem;"><img class="card-img-top" src="file:///C:/Users/%C3%87ART%20APP/Desktop/Yeni%20klas%C3%B6r/icon.png0" alt=""><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p><a href="#" class="btn btn-primary">Go somewhere</a></div></div><div class="card" style="width: 18rem;"><img class="card-img-top" src="//via.placeholder.com/640x420" alt="Card image cap"><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p><a href="#" class="btn btn-primary">Go somewhere</a></div></div><div class="card" style="width: 18rem;"><img class="card-img-top" src="//via.placeholder.com/640x420" alt="Card image cap"><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p><a href="#" class="btn btn-primary">Go somewhere</a></div></div></div>'
  },
  {
    id: 7,
    name: "Checkbox",
    icon: "check_box",
    description: "",
    html:
      '<br><div class="form-check col col-8"><input class="form-check-input" type="checkbox" value="" id="defaultCheck1"><label class="form-check-label" for="defaultCheck1">Checkbox</label></div>'
  },
  {
    id: 8,
    name: "Radio Button",
    icon: "radio_button_checked",
    description: "",
    html:
      '<br><div class="form-check col col-8"><input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1"><label class="form-check-label" for="exampleRadios1">Radio Button</label></div>'
  },
];

function applyBuilderClass(elem) {
  elem.attr("contenteditable", "true");
  elem.addClass("builder-element");
}
$(".remove-button").click(function () {
  console.log($(".builder-element").last());

  $(".builder-element").last().remove();
});

$(".export-button").click(function () {
  if ($(".builder-element").length > 0) {
    var elements = [];
    $(".builder-element").each(function (index, element) {
      var component = $(this).data("component");

      console.log(component.id);
      elements.push(component.id);
    });

    var newWin = open("url", "windowName", "height=300,width=300");
    newWin.document.write(elements);
  } else {
    alert("Dışa aktarılacak bir şey yok.");
  }
});

$(".import-button").click(function () {
  console.log("import");

  if ($(".builder-element").length == 0) {
    let elements = prompt("kod giriniz");
    if (elements == "null" || elements == "") {
      alert("hiçbir şey girilmedi");
    } else {
      console.log("input");
      console.log(elements);

      elementArray = elements.split(",");

      console.log(elementArray);

      if (elementArray.length > 0) {
        for (var i = 0; i < elementArray.length; i++) {
          console.log("bileşenin kimliği");
          console.log(elementArray[i]);

          var exportid = elementArray[i];
          var item = componentData.find((item) => item.id == exportid);
          if (item != undefined) {
            elem = $(item.html);

            $(".preview-instructons").remove();

            applyBuilderClass(elem);

            $(".preview").append(elem);
          }
        }
      }
    }
  } else {
    alert("Yalnızca boş bir sayfada içe aktarabilirsiniz.");
  }
});
for (var i = 0; i < componentData.length; i++) {
  var component = componentData[i];
  var cardHTML = "";
  cardHTML += "<div class = 'sidebar-card'>";
  cardHTML += "<span class='material-icons'>" + component.icon + "</span>";
  cardHTML +=
    "<span class = 'sidebar-card-title'><b>" + component.name + "</b></span>";
  cardHTML += "</br>" + component.description;
  cardHTML += "</div>";

  var cardjquery = $(cardHTML);

  cardjquery.data("component", component);
  cardjquery.click(function () {
    $(".preview-instructons").remove();
    var elem = $($(this).data("component").html);
    elem.data("component", $(this).data("component"));
    applyBuilderClass(elem);
    $(".preview").append(elem);
    window.scrollTo(0, document.body.scrollHeight);
  });
  $(".sidebar").append(cardjquery);
}