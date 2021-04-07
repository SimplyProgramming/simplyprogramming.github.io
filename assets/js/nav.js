const createElement = (tag, arg1) => {
  let node = document.createElement(tag);
  
  if (typeof arg1 === "string") {
    node.appendChild(document.createTextNode(arg1));
  } else if (typeof arg1 === "object") {
    if (arg1.text) node.appendChild(document.createTextNode(arg1.text));
    if (arg1.id) node.id = arg1.id;
    if (arg1.class) node.classList = arg1.class;
    if (arg1.style) for (let key of Object.keys(arg1.style)) node.style[key] = arg1.style[key];
  }
  
  return node;
};

const createNav = (contents) => {
  let navNode = createElement("div", {
    "id": "nav"
  });
  let navLeftNode = createElement("ul", {
    "id": "nav-left"
  });
  let menuNode = createElement("li", {
    "id": "menu"
  });
  
  let menuLinkNode = createElement("a");
  menuLinkNode.appendChild(createElement("span", {
    "id": "nav-menu-icon",
    "style": {
      "margin-right": "5px"
    }
  }));
  menuLinkNode.appendChild(createElement("span", "Menu"));
  
  menuNode.appendChild(menuLinkNode);
  navLeftNode.appendChild(menuNode);
  
  for (let key of Object.keys(contents)) {
    let content = contents[key];
    let subs = content.subs;
    
    let listItemNode = createElement("li");
    let linkNode = createElement("a", key);
    linkNode.href = content.href;
    
    listItemNode.appendChild(linkNode);
    
    if (subs) {
      let subListNode = createElement("ul");
      
      let counter = 0;
      for (let subKey of Object.keys(subs)) {
        let subListItemNode = createElement("li");
        subListItemNode.style["z-index"] = (1000 - ++counter).toString();
        
        let subListItemLinkNode = createElement("a", subKey);
        subListItemLinkNode.href = subs[subKey];
        
        subListItemNode.appendChild(subListItemLinkNode);
        subListNode.appendChild(subListItemNode);
      }
      
      listItemNode.appendChild(subListNode);
    }
    
    navLeftNode.appendChild(listItemNode);
  }
  
  navNode.appendChild(navLeftNode);
  
  return navNode;
}

let contents = {
  "Home": {
    "href": "/"
  },
  "Projects": {
    "href": "/projects",
    "subs": {
      "Latest": "/projects?sort=latest"
    }
  }
};

document.body.appendChild(createNav(contents));
