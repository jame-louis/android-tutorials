---
layout: tutorial
title: "您的第一个Android应用"
tutorial_name: your-first-application
difficulty: Beginner
duration: 20 mins
creator: jame louis
---

## 准备工作

在计算机安装 Android Studio 4.1.1。确保您的计算机符合运行 Android Studio 的最低要求。
如果您需要有关设置过程的更详细说明，请参阅[下载并安装 Android Studio]({{ '/tutorials/set-up-android-studio/' | relative_url }})。

在此教程中，您将使用Android Studio提供的项目模板创建自己的首个Android应用。

### 前提条件

- 已安装 Android Studio 4.1.1 或更高版本
- 具备 Java 的基础理解
- 30–60 分钟的空闲时间

### 学习内容

- 如何使用Android Studio创建新的Android项目
- 项目结构与组件
- 运行应用于模拟器或物理设备

### 您将构建的应用

您将创建一个简单的Android应用，该应用在屏幕上显示“Hello World!”文本。

##  创建项目


在本教程中， 我们将使用Android Studio提供的Empty Activity项目模板创建一个新的Android项目。

如需要在Android Studio中创建新的项目，请按照以下步骤操作：

- 双击Android Studio图标，打开Android Studio。

![Android Studio Logo]({{ '/assets/images/android-studio-logo.png' | relative_url }})

- 在欢迎界面，点击“Start a new Android Studio project”。或者从菜单中选择“File” > “New” > “New Project”。

![Create New Project Dialog]({{ '/assets/images/new-project-by-menu.png' | relative_url }})

- 在“Create New Project”对话框中，选择“Empty Activity”项目模板。

![新建项目模板对话框]({{ '/assets/images/new-project-template-dialog.png' | relative_url }})

- 输入项目名称，例如“HelloWorld”。
- 选择项目存储位置。
- 点击“Finish”创建项目。

![新建项目配置对话框]({{ '/assets/images/new-project-setting-dialog.png' | relative_url }})

### 问题修复

如果在创建项目时遇到以下错误：

```bash
Failed to open zip file.
Gradle's dependency cache may be corrupt (this sometimes occurs after a network connection timeout.)
```
- 解决方法：
  - 在项目视图中，依次点击 'helloworld' > 'gradle' > 'wrapper' > 'gradle-wrapper.properties'。
  - 修改 'distributionUrl' 为国内腾讯镜像的 Gradle 版本。
  - 如：`distributionUrl=https\://mirrors.tencent.com/gradle/gradle-6.5-bin.zip`
  - 点击 ‘Sync Now’, 同步一下项目。



##  Android Studio 界面

![Android Studio 界面]({{ '/assets/images/android-studio-interface.png' | relative_url }})

- Android Studio 界面主要由以下几个部分组成：菜单、工具栏、项目视图、主界面、布局编辑器、日志cat、设备管理器。

![项目视图]({{ '/assets/images/project-view.png' | relative_url }})

- 项目视图（Project View）：显示项目的文件结构。
  - AndroidManifest.xml：包含应用的配置信息，如活动（Activity）、服务（Service）、广播接收器（Broadcast Receiver）等。
  - Java 文件夹：包含应用的 Java 代码文件。
    - MainActivity.java：应用的主活动类，包含应用的入口点。
  - res 文件夹：包含应用的资源文件，如布局文件（layout）、字符串资源（strings）、图像资源（drawable）等。

![布局编辑器]({{ '/assets/images/layout-editor.png' | relative_url }})

- 编辑器（Editor）：用于编辑代码。
- 布局编辑器（Layout Editor）：用于设计应用的用户界面。
  - Design：设计视图，用于可视化设计应用的用户界面。
  - Palette：调色板视图，提供常用的UI组件。
  - Component Tree：组件树视图，显示应用的组件层级关系。
  - Attributes：属性视图，显示选中组件的属性信息。

![Logcat]({{ '/assets/images/logcat.png' | relative_url }})

- 日志cat（Logcat）：显示应用运行时的日志信息。
  - 过滤选项：用于筛选显示的日志信息，如按标签（Tag）、优先级（Priority）等。

## 运行应用

![运行按钮]({{ '/assets/images/build-run.png' | relative_url }})

- 要运行应用，请点击工具栏上的“运行”按钮（绿色的三角形图标）。
  - 或者，从菜单中选择“Run” > “Run 'app'”。
- Android Studio 将构建应用并在连接的设备或模拟器上安装和运行它。
- 您可以在日志cat中查看应用的日志输出。

![hello world]({{ '/assets/images/hello-world.png' | relative_url }})