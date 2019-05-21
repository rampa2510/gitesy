
![gitesy logo](files/LogoMakr_4LW8VJ.png)


# GITESY

> Automate your git workflow!!!

> Gone are the days when you used to create local and remote repo seperately

> Git , Github

[![GitHub API](https://img.shields.io/badge/GitHub-API-teal.svg?style=flat&logo=github)](https://developer.github.com/v3/) [![GitHub gitesy](https://img.shields.io/badge/gitesy-blue.svg?style=flat&logo=github)](https://gitesy.com/) [![Known Vulnerabilities](https://snyk.io/test/github/ram2510/gitesy/badge.svg?targetFile=package.json)](https://snyk.io/test/github/ram2510/gitesy?targetFile=package.json) 
[![HitCount](https://hits.dwyl.com/ram2510/gitesy.svg)](https://hits.dwyl.com/ram2510/gitesy)

- devDependencies - ![David](https://img.shields.io/david/dev/ram2510/gitesy.svg?style=flat-square)
- license - [![GitHub license](https://img.shields.io/github/license/ram2510/gitesy.svg?style=flat&logo=github)](https://github.com/ram2510/gitesy/blob/master/LICENSE)

<hr>


![gitesy demo](files/gitesy.gif)

## Table of Contents 


- [GITESY](#gitesy)
  - [Table of Contents](#table-of-contents)
  - [Example](#example)
  - [Installation](#installation)
    - [Clone](#clone)
  - [Features](#features)
  - [Usage](#usage)
    - [Create a new repo](#create-a-new-repo)
    - [Add a new template](#add-a-new-template)
  - [Contributing](#contributing)
    - [Step 1](#step-1)
    - [Step 2](#step-2)
    - [Step 3](#step-3)
    - [Ways to contribute](#ways-to-contribute)
  - [License](#license)


---

## Example 

```
gitesy -n <nameOfTheRepo> 

```

---


## Installation

Type this in your command prompt/terminal

```
npm i gitesy -g
```

please note - Install this as a global package otherwise this may not work as expected

---

### Clone
To clone this repo use

```
git clone https://github.com/ram2510/gitesy.git
```

When you clone this repo this is how your directory should look like
  ```
  ├── coverage
  ├── files
  ├── index.js
  ├── lib
  ├── LICENSE
  ├── node_modules
  ├── package.json
  ├── package-lock.json
  ├── README.md
  ├── templates
  └── test
  ```


## Features

You can now create local as well as remote repo with a single command also you can use templates OR create your own template and add them 
so that you can use it later 

## Usage 

### Create a new repo
- To create a local and remote repo use
  ```
  gitesy -n test
  ```

- After which if you are using this for the first time you will see aprompt for entering your credentials like this
  
  ![creds demo](files/creds.png)

  Enter them and then you will get prompts asking details of the repo fill them and then it will automatically create the repo. Then you will get the message and start working on the project !!!!


### Add a new template
- To Add a template create a template add the features and then use this command from the same directory
  ```
  gitesy -a <nameOfTheTemplate>
  ```
  ![create template demo](files/template.gif)


---

## Contributing

> You can contribute to this project in various ways but let us follow the steps

### Step 1

- **Option 1**
    - 🍴 Fork this repo!

- **Option 2**
    - 👯 Clone this repo to your local machine using `https://github.com/ram2510/gitesy.git`

### Step 2

- **HACK AWAY!** 🔨🔨🔨

### Step 3

- 🔃 Create a new pull request using <a href="https://github.com/ram2510/gitesy/compare/" target="_blank">`https://github.com/ram2510/gitesy/compare/`</a>.

---

### Ways to contribute
- Fix typo,
- Add documentation
- Add more templates. I am more experienced in node so i created node templates you can add other language templates and create a pr but please make the template in such a way that it tries to cover all genral cases

---



![Twitter Follow](https://img.shields.io/twitter/follow/codingpanda25.svg?label=Follow&style=social)
 [![linkedin](https://img.shields.io/badge/connect%20with%20me-linkedIn-green.svg?style=for-the-badge&logo=appveyor)](https://www.linkedin.com/in/iamram2510) [![GMAIL](https://img.shields.io/static/v1.svg?label=send&message=iamram2510@ieee.org&color=red&logo=gmail&style=social)](https://www.github.com/ram2510) 
