---
title: JavaScript
---

# Javascript

## 事件循环

事件循环是异步的实现方式，单线程是异步产生的原因。单线程设计是建立在事件循环机制之上的，事件循环是JavaScript实现异步编程的关键。

### 进程与线程

> 进程之间内存不共享，线程之间的内存是共享的，一个进程至少有一个线程，一个进程可以包含多个线程

#### 进程

一个程序的专属内存空间，可以把这块内存空间简单理解为进程。每个应用至少有一个进程，进程之间相互独立，如果需要通信，需要双方同意。

- 进程与进程之间完全隔离，互不干扰，一个进程崩溃不会影响其他进程，避免一个进程出错影响整个程序。
- 进程与进程之间需要传递某些数据的话，就需要通过`进程通信管道IPC`来传递。
- 一个进程中可以并发多个线程，每个线程并行执行不同的任务。

#### 线程

有了进程之后就可以将程序运行，运行程序则需要线程去执行，在进程开启后会自动创建一个线程，称之为主线程。所以`一个进程至少有一个线程`。

如果程序需要同时执行多个代码逻辑，主线程可以启动更多的线程来执行代码，所以`一个进程可以包含多个线程`。

- 一个进程中的任意一个线程执行出错，会导致这个进程崩溃。
- 同一进程下的线程之间可以直接通信和共享数据。
- 当一个进程关闭之后，操作系统会回收该进程的内存空间。

#### ·浏览器的进程和线程

> 现代浏览器是一个多进程的程序（IE>=9），一般一个标签页就是一个独立的进程。老式的浏览器为了节省内存以及CPU的开销，采用单线程模式，这种模式下页面的加载会相对缓慢，容易阻塞，一旦出现故障整个浏览器进程都会出错。
>
> 推荐一篇掘进文章，[深入理解浏览器中的进程与线程](https://juejin.cn/post/6991849728493256741)

Chrome浏览器可以在`更多工具->任务管理器`或者`Shift+Esc`查看浏览器进程。浏览器从关闭到启动，然后新开一个页面至少需要其中常见的进程如下：

1. 浏览器进程

   主要负责界面显示、用户交互、子进程管理等。浏览器进程内部会启动多个线程处理不同的任务。

2. 网络进程

   负责加载网络资源。网络进程内部会启动多个线程来处理不同的网络任务。

3. **渲染进程**

   渲染进程启动后，会开启一个**渲染主线程**，核心任务是将HTML、CSS、JS转为用户可以与之交互的网页，排版引擎Blink和JS引擎V8都是运行在该进程中。

   默认情况下，浏览器会为每个标签页开启一个新的渲染进程，以保证不同的标签页之间不相互影响。（将来该默认模式可能会有所改变，同一个域名共享一个渲染进程（详见[chrome官方说明文档](https://chromium.googlesource.com/chromium/src/+/main/docs/process_model_and_site_isolation.md##Modes-and-Availability)）

   - `GUI渲染线程`：负责渲染页面，解析html和CSS、构建DOM树、CSSOM树、渲染树、和绘制页面，重绘重排也是在该线程执行。
   - `JS引擎线程`：一个tab页中只有一个JS引擎线程(单线程)，负责解析和执行JS。**它GUI渲染进程不能同时执行，只能一个一个来，如果JS执行过长就会导致阻塞掉帧**。
   - `计时器线程`：指setInterval和setTimeout，因为JS引擎是单线程的，所以如果处于阻塞状态，那么计时器就会不准了，所以需要单独的线程来负责计时器工作。
   - `异步http请求线程`： XMLHttpRequest连接后浏览器开的一个线程，比如请求有回调函数，异步线程就会将回调函数加入事件队列，等待JS引擎空闲执行。
   - `事件触发线程`：主要用来控制事件循环，比如JS执行遇到计时器，AJAX异步请求等，就会将对应任务添加到事件触发线程中，在对应事件符合触发条件触发时，就把事件添加到待处理队列的队尾，等JS引擎处理。

#### ·任务优先级

任务是没有优先级的，遵循先进先出的原则。 但是**任务队列的执行是有优先级的**。

根据 W3C 的最新解释:

- 每个任务都有一个任务类型，同一个类型的任务必须在一个队列，不同类型的任务可以分属于不同的队列。
  在一次事件循环中，浏览器可以根据实际情况从不同的队列中取出任务执行。
- 浏览器必须准备好一个微队列，微队列中的任务优先所有其他任务执行。
  <https://html.spec.whatwg.org/multipage/webappapis.html##perform-a-microtask-checkpoint>

> 随着浏览器的复杂度急剧提升，W3C 不再使用宏队列的说法

在目前 chrome 的实现中，至少包含了下面的队列：

- 微队列：用户存放需要最快执行的任务，优先级「最高」。
- 交互队列（用户操作）：用于存放用户操作后产生的事件处理任务，优先级「高」。
- 延时队列（计时器）：用于存放计时器到达后的回调任务，优先级「中」。

#### 面试题

##### 代码的输出结果？

```js
setTimeout(function () {
    console.log(6);
}, 0);

function delay(duration) {
    var start = Date.now();
    while (Date.now() - start < duration) { }
}
delay(3000);
console.log(1);

function a() {
    console.log(4);
    Promise.resolve().then(function () {
        console.log(5);
    });
}
setTimeout(function () {
    console.log(7);
}, 0);

Promise.resolve().then(() => {
    console.log(3)
    a()
});
console.log(2);
```

> 1.结果为：2  1
>
> 2.结果为：1  2  3  4  5  6  7

##### 根据以下代码，解释JS为什么会阻碍页面渲染？

```html
<h1>Hello World!</h1>
<button>change</button>
<script>
    var h1 = document.querySelector('h1');
    var btn = document.querySelector('button');

    // 死循环指定的时间
    function delay(duration) {
        var start = Date.now();
        while (Date.now() - start < duration) { }
    }

    btn.onclick = function () {
        h1.textContent = 'change content';
        delay(3000);
    };
    // 点击按钮之后，页面会先卡死3秒钟，然后再渲染出更改后的内容

</script>
<!-- 
    参考答案：
    因为JS的执行和页面的渲染都在一个线程中执行。
    当执行delay(3000)时，主线程会将元素的内容进行修改（但并未渲染），然后一直执行循环逻辑，等循环逻辑执行完成（主线程空闲）之后，才会从任务队列中取出重新渲染的任务进行执行。
-->
```

##### 如何理解 JS 的异步？

> 参考答案：
>
> JS是一门单线程的语言，这是因为它运行在浏览器的渲染主线程中，而渲染主线程只有一个。
>
> 而渲染主线程承担着诸多的工作，渲染页面、执行 JS 都在其中运行。
>
> 如果使用同步的方式，就极有可能导致主线程产生阻塞，从而导致消息队列中的很多其他任务无法得到执行。这样一来，一方面会导致繁忙的主线程白白的消耗时间，另一方面导致页面无法及时更新，给用户造成卡死现象。
>
> 所以浏览器采用异步的方式来避免。具体做法是当某些任务发生时，比如计时器、网络、事件监听，主线程将任务交给其他线程去处理，自身立即结束任务的执行，转而执行后续代码。当其他线程完成时，将事先传递的回调函数包装成任务，加入到消息队列的末尾排队，等待主线程调度执行。
>
> 在这种异步模式下，浏览器永不阻塞，从而最大限度的保证了单线程的流畅运行。

##### 阐述一下 JS 的事件循环

> 参考答案：
>
> 事件循环又叫做消息循环，是浏览器渲染主线程的工作方式。
>
> 在 Chrome 的源码中，它开启一个不会结束的 for 循环，每次循环从消息队列中取出第一个任务执行，而其他线程只需要在合适的时候将任务加入到队列末尾即可。
>
> 过去把消息队列简单分为宏队列和微队列，这种说法目前已无法满足复杂的浏览器环境，取而代之的是一种更加灵活多变的处理方式。
>
> 根据 W3C 官方的解释，每个任务有不同的类型，同类型的任务必须在同一个队列，不同的任务可以属于不同的队列。不同任务队列有不同的优先级，在一次事件循环中，由浏览器自行决定取哪一个队列的任务。但浏览器必须有一个微队列，微队列的任务一定具有最高的优先级，必须优先调度执行。

##### JS 中的计时器能做到精确计时吗？为什么？

> 不行，因为：
>
> 1. 计算机硬件没有原子钟，无法做到精确计时
> 2. 操作系统的计时函数本身就有少量偏差，由于 JS 的计时器最终调用的是操作系统的函数，也就携带了这些偏差
> 3. 按照 W3C 的标准，浏览器实现计时器时，如果嵌套层级超过 5 层，则会带有 4 毫秒的最少时间，这样在计时时间少于 4 毫秒时又带来了偏差
> 4. *受事件循环的影响，计时器的回调函数只能在主线程空闲时运行，因此又带来了偏差

## 浏览器渲染原理

等待资源加载时间和大部分情况下的浏览器单线程执行是影响 Web 性能的两大主要原因。

等待时间是需要去克服来让浏览器快速加载资源的主要威胁。为了实现快速加载，开发者的目标就是尽可能快的发送请求的信息，至少看起来相当快。网络等待时间是在链路上传送二进制到电脑端所消耗的链路传输时间。Web 性能优化需要做的就是尽可能快的使页面加载完成。

大部分情况下，浏览器是单线程执行的。为了有流畅的交互，开发者的目标是确保网站从流畅的页面滚动到点击响应的交互性能。渲染时间是关键要素，确保主线程可以完成所有给它的任务并且仍然一直可以处理用户的交互。通过了解浏览器单线程的本质与最小化主线程的责任可以优化 Web 性能，来确保渲染的流畅和交互响应的及时。

用户通过在地址栏输入一个 URL到看到界面的完成流程。

### 资源加载

1. DNS 查询

   对于一个 web 页面来说导航的第一步是要去寻找页面资源的位置。如果导航到 `https://example.com`，HTML 页面被定位到 IP 地址为 `93.184.216.34` 的服务器。如果以前没有访问过这个网站，就需要进行 DNS 查询。

   浏览器向**名称服务器**发起 DNS 查询请求，最终得到一个 IP 地址。第一次请求之后，这个 IP 地址可能会被缓存一段时间，这样可以通过从缓存里面检索 IP 地址而不是再通过名称服务器进行查询来加速后续的请求。

   通过主机名加载一个页面通常仅需要一次 DNS 查询。但是，对于页面指向的不同的主机名，则需要多次 DNS 查询。如果字体（font）、图像（image）、脚本（script）、广告（ads）和网站统计（metric）都有不同的主机名，则需要对每一个主机名进行 DNS 查询。

   ![移动终端的请求先发送到基站，接着发送到运营商的中心计算机，然后再发送到互联网](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work/latency.jpg)

   DNS 查询可能存在性能问题，特别是对于移动网络。当一个用户使用了移动网络，每一个 DNS 查询必须从手机发送到基站，然后到达一个认证的 DNS 服务器。手机、信号塔、名称服务器之间的距离可能是一个大的时间等待。

2. TCP 握手

   一旦获取到服务器 IP 地址，浏览器就会通过 [TCP“三次握手” (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/TCP_handshake)与服务器建立连接。这个机制的是用来让两端尝试进行通信——在浏览器和服务器通过上层协议 [HTTPS](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTPS) 发送数据之前，可以协商网络 TCP 套接字连接的一些参数。

   TCP 的“三次握手”技术经常被称为“SYN-SYN-ACK”——更确切的说是 SYN、SYN-ACK、ACK——因为通过 TCP 首先发送了三个消息进行协商，然后在两台电脑之间开始一个 TCP 会话。是的，这意味着终端与每台服务器之间还要来回发送三条消息，而请求尚未发出。

3. TLS 协商

   对于通过 HTTPS 建立的安全连接，还需要另一次 "握手"。这种握手，或者说 [TLS](https://developer.mozilla.org/zh-CN/docs/Glossary/TLS) 协商，决定使用哪种密码对通信进行加密，验证服务器，并在开始实际数据传输前建立安全连接。这就需要在实际发送内容请求之前，再往返服务器五次。

   ![DNS 查询、TCP 握手和 TLS 5 步握手（包括服务器和客户端之间的 clienthello、serverhello 以及证书、clientkey 和完成消息）。](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work/ssl.jpg)

   虽然建立安全连接对增加了加载页面的等待时间，对于建立一个安全的连接来说，以增加等待时间为代价是值得的，因为在浏览器和 web 服务器之间传输的数据不可以被第三方解密。

   经过 8 次往返，浏览器终于可以发出请求。

4. 响应

   一旦我们建立了到 web 服务器的连接，浏览器就代表用户发送一个初始的 [HTTP `GET` 请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods)，对于网站来说，这个请求通常是一个 HTML 文件。一旦服务器收到请求，它将使用相关的响应头和 HTML 的内容进行回复。

   ```html
   <!doctype html>
   <html lang="zh-CN">
     <head>
       <meta charset="UTF-8" />
       <title>简单的页面</title>
       <link rel="stylesheet" href="styles.css" />
       <script src="myscript.js"></script>
     </head>
     <body>
       <h1 class="heading">我的页面</h1>
       <p>含有<a href="https://example.com/about">链接</a>的段落。</p>
       <div>
         <img src="myimage.jpg" alt="图像描述" />
       </div>
       <script src="anotherscript.js"></script>
     </body>
   </html>
   ```

   初始请求的响应包含所接收数据的第一个字节。[首字节时间（TTFB）](https://developer.mozilla.org/zh-CN/docs/Glossary/Time_to_first_byte)是用户通过点击链接进行请求与收到第一个 HTML 数据包之间的时间。第一个内容分块通常是 14KB 的数据。

   上面的示例中，这个请求肯定是小于 14KB 的，但是直到浏览器在解析阶段遇到链接时才会去请求链接的资源，下面有进行描述。

5. 拥塞控制 / TCP 慢启动

   TCP 数据包在传输过程中被分成若干段。由于 TCP 保证数据包的顺序，因此服务器在发送一定数量的数据包后，必须以 ACK 数据包的形式收到客户端的确认。

   如果服务器在每个网段后都等待 ACK，则会导致客户端频繁发出 ACK，即使在网络负荷较低的情况下也会增加传输时间。

   另一方面，一次性发送过多网段可能会导致这样的问题：在繁忙的网络中，客户端无法接收到网段，只能长时间不停地回应 ACK，服务器不得不不断重新发送网段。

   为了平衡传输段的数量，[TCP 慢启动](https://developer.mozilla.org/zh-CN/docs/Glossary/TCP_slow_start)算法用于逐渐增加传输数据量，直到确定最大网络带宽，并在网络负载较高时减少传输数据量。

   传输段的数量由拥塞窗口（CWND）的值控制，该值可初始化为 1、2、4 或 10 MSS（以太网协议中的 MSS 为 1500 字节）。该值是发送的字节数，客户端收到后必须发送 ACK。

   如果收到 ACK，那么 CWND 值将加倍，这样服务器下次就能发送更多的数据段。相反，如果没有收到 ACK，那么 CWND 值将减半。因此，这种机制在发送过多网段和过少网段之间取得了平衡。

#### 页面解析渲染

1. 解析

   一旦浏览器收到数据的第一块，它就可以开始解析收到的信息。[“解析”](https://developer.mozilla.org/zh-CN/docs/Glossary/Parse)是浏览器将通过网络接收的数据转换为 [DOM](https://developer.mozilla.org/zh-CN/docs/Glossary/DOM) 和 [CSSOM](https://developer.mozilla.org/zh-CN/docs/Glossary/CSSOM) 的步骤，通过渲染器把 DOM 和 CSSOM 在屏幕上绘制成页面。

   DOM 是浏览器标记的内部表示。DOM 也是被暴露的，可以通过 JavaScript 中的各种 API 进行 DOM 操作。

   即使请求页面的 HTML 大于初始的 14KB 数据包，浏览器也将开始解析并尝试根据其拥有的数据进行渲染。这就是为什么在前 14KB 中包含浏览器开始渲染页面所需的所有内容，或者至少包含页面模板（第一次渲染所需的 CSS 和 HTML）对于 web 性能优化来说是重要的。但是在渲染到屏幕上面之前，HTML、CSS、JavaScript 必须被解析完成。

2. 构建 DOM 树

   我们在[关键渲染路径](https://developer.mozilla.org/zh-CN/docs/Web/Performance/Critical_rendering_path)这篇文章中描述了五个步骤。

   第一步是处理 HTML 标记并构造 DOM 树。HTML 解析涉及到[符号化](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList)和树的构造。HTML 标记包括开始和结束标记，以及属性名和值。如果文档格式良好，则解析它会简单而快速。解析器将标记化的输入解析到文档中，构建文档树。

   DOM 树描述了文档的内容。[`<html>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/html) 元素是第一个标签也是文档树的根节点。树反映了不同标记之间的关系和层次结构。嵌套在其他标记中的标记是子节点。DOM 节点的数量越多，构建 DOM 树所需的时间就越长。

   ![我们示例代码的 DOM 树，显示了所有节点（包括文本节点）。](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work/dom.gif)

   当解析器发现非阻塞资源，例如一张图片，浏览器会请求这些资源并且继续解析。当遇到一个 CSS 文件时，解析也可以继续进行，但是对于 `<script>` 标签（特别是没有 [`async`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 或者 `defer` 属性的）会阻塞渲染并停止 HTML 的解析。尽管浏览器的预加载扫描器加速了这个过程，但过多的脚本仍然是一个重要的瓶颈。

3. 预加载扫描器

   浏览器构建 DOM 树时，这个过程占用了主线程。当这种情况发生时，预加载扫描仪将解析可用的内容并请求高优先级资源，如 CSS、JavaScript 和 web 字体。多亏了预加载扫描器，我们不必等到解析器找到对外部资源的引用来请求它。它将在后台检索资源，以便在主 HTML 解析器到达请求的资源时，它们可能已经在运行，或者已经被下载。预加载扫描仪提供的优化减少了阻塞。

   ```html
   <link rel="stylesheet" href="styles.css" />
   <script src="myscript.js" async></script>
   <img src="myimage.jpg" alt="图像描述" />
   <script src="anotherscript.js" async></script>
   ```

   在这个例子中，当主线程在解析 HTML 和 CSS 时，预加载扫描器将找到脚本和图像，并开始下载它们。为了确保脚本不会阻塞进程，当 JavaScript 解析和执行顺序不重要时，可以添加 `async` 属性或 `defer` 属性。

   等待获取 CSS 不会阻塞 HTML 的解析或者下载，但是它确实会阻塞 JavaScript，因为 JavaScript 经常用于查询元素的 CSS 属性。

4. 构建 CSSOM 树

   第二步是处理 CSS 并构建 CSSOM 树。CSS 对象模型和 DOM 是相似的。DOM 和 CSSOM 是两棵树。它们是独立的数据结构。浏览器将 CSS 规则转换为可以理解和使用的样式映射。浏览器遍历 CSS 中的每个规则集，根据 CSS 选择器创建具有父、子和兄弟关系的节点树。

   与 HTML 一样，浏览器需要将接收到的 CSS 规则转换为可以使用的内容。因此，它重复了 HTML 到对象的过程，但对于 CSS。

   CSSOM 树包括来自用户代理样式表的样式。浏览器从适用于节点的最通用规则开始，并通过应用更具体的规则递归地优化计算的样式。换句话说，它级联属性值。

   构建 CSSOM 非常快，并且在当前的开发工具中没有以独特的颜色显示。相反，开发人员工具中的“重新计算样式”显示解析 CSS、构建 CSSOM 树和递归计算计算样式所需的总时间。在 web 性能优化方面，它是可轻易实现的，因为创建 CSSOM 的总时间通常小于一次 DNS 查询所需的时间。

5. 其他过程

   **JavaScript 编译**

   在解析 CSS 和创建 CSSOM 的同时，包括 JavaScript 文件在内的其他资源也在下载（这要归功于预加载扫描器）。JavaScript 会被解析、编译和解释。脚本被解析为抽象语法树。有些浏览器引擎会将[抽象语法树](https://zh.wikipedia.org/wiki/抽象语法树)输入编译器，输出字节码。这就是所谓的 JavaScript 编译。大部分代码都是在主线程上解释的，但也有例外，例如在 [web worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中运行的代码。

   **构建无障碍树**

   浏览器还构建辅助设备用于分析和解释内容的[无障碍](https://developer.mozilla.org/zh-CN/docs/Learn/Accessibility)树。无障碍对象模型（AOM）类似于 DOM 的语义版本。当 DOM 更新时，浏览器会更新辅助功能树。辅助技术本身无法修改无障碍树。

   在构建 AOM 之前，[屏幕阅读器 (en-US)](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Screen_Reader_Implementors_Guide)无法访问内容。

6. 渲染

   渲染步骤包括样式、布局、绘制，在某些情况下还包括合成。在解析步骤中创建的 CSSOM 树和 DOM 树组合成一个渲染树，然后用于计算每个可见元素的布局，然后将其绘制到屏幕上。在某些情况下，可以将内容提升到它们自己的层并进行合成，通过在 GPU 而不是 CPU 上绘制屏幕的一部分来提高性能，从而释放主线程。

   **样式**

   关键呈现路径的第三步是将 DOM 和 CSSOM 组合成渲染树。计算样式树或渲染树的构建从 DOM 树的根开始，遍历每个可见节点。

   不会被显示的元素，如 [`<head>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/head) 元素及其子元素，以及任何带有 `display: none` 的节点，如用户代理样式表中的 `script { display: none; }`，都不会包含在渲染树中，因为它们不会出现在渲染输出中。应用了 `visibility: hidden` 的节点会包含在渲染树中，因为它们会占用空间。由于我们没有给出任何指令来覆盖用户代理默认值，因此上述代码示例中的 `script` 节点不会包含在渲染树中。

   每个可见节点都应用了 CSSOM 规则。渲染树包含所有可见节点的内容和计算样式，将所有相关样式与 DOM 树中的每个可见节点匹配起来，并根据 [CSS 级联](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Cascade)，确定每个节点的计算样式。

   **布局**

   第四步是在渲染树上运行布局以计算每个节点的几何体。*布局*是确定呈现树中所有节点的宽度、高度和位置，以及确定页面上每个对象的大小和位置的过程。回流是对页面的任何部分或整个文档的任何后续大小和位置的确定。

   构建渲染树后，开始布局。渲染树标识显示哪些节点（即使不可见）及其计算样式，但不标识每个节点的尺寸或位置。为了确定每个对象的确切大小和位置，浏览器从渲染树的根开始遍历它。

   在网页上，大多数东西都是一个盒子。不同的设备和不同的桌面意味着无限数量的不同的视区大小。在此阶段，考虑到视口大小，浏览器将确定屏幕上所有不同框的尺寸。以视口的大小为基础，布局通常从 body 开始，用每个元素的框模型属性排列所有 body 的子孙元素的尺寸，为不知道其尺寸的替换元素（例如图像）提供占位符空间。

   第一次确定节点的大小和位置称为布局。随后对节点大小和位置的重新计算称为回流。在我们的示例中，假设初始布局发生在返回图像之前。由于我们没有声明图像的尺寸，因此一旦知道图像的尺寸，就会出现回流。

   **绘制**

   最后一步是将各个节点绘制到屏幕上，第一次出现的节点称为 [first meaningful paint (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/First_meaningful_paint)。在绘制或光栅化阶段，浏览器将在布局阶段计算的每个框转换为屏幕上的实际像素。绘画包括将元素的每个可视部分绘制到屏幕上，包括文本、颜色、边框、阴影和替换的元素（如按钮和图像）。浏览器需要非常快地完成这项工作。

   为了确保平滑滚动和动画，占据主线程的所有内容，包括计算样式，以及回流和绘制，必须让浏览器在 16.67 毫秒内完成。在 2048x1536 分辨率的 iPad 上，有超过 314.5 万像素将被绘制到屏幕上。那是很多像素需要快速绘制。为了确保重绘的速度比初始绘制的速度更快，屏幕上的绘图通常被分解成数层。如果发生这种情况，则需要进行合成。

   绘制可以将布局树中的元素分解为多个层。将内容提升到 GPU 上的层（而不是 CPU 上的主线程）可以提高绘制和重新绘制性能。有一些特定的属性和元素可以实例化一个层，包括 [`video`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video) 和 [`canvas`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas)，任何 CSS 属性为 [`opacity`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/opacity) 、3D [`transform`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)、[`will-change`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change) 的元素，还有一些其他元素。这些节点将与子节点一起绘制到它们自己的层上，除非子节点由于上述一个（或多个）原因需要自己的层。

   分层确实可以提高性能，但是它以内存管理为代价，因此不应作为 web 性能优化策略的一部分过度使用。

   **合成**

   当文档的各个部分以不同的层绘制，相互重叠时，必须进行合成，以确保它们以正确的顺序绘制到屏幕上，并正确显示内容。

   当页面继续加载资源时，可能会发生回流（回想一下我们迟到的示例图像），回流会触发重新绘制和重新组合。如果我们定义了图像的大小，就不需要重新绘制，只需要重新绘制需要重新绘制的层，并在必要时进行合成。但我们没有包括图像大小！从服务器获取图像后，渲染过程将返回到布局步骤并从那里重新开始。

   **交互**

   一旦主线程绘制页面完成，你会认为我们已经“准备好了”，但事实并非如此。如果加载包含 JavaScript（并且延迟到 [`onload`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/load_event) 事件触发后执行），则主线程可能很忙，无法用于滚动、触摸和其他交互。

   [可交互时间（TTI） (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Time_to_interactive)是测量从第一个请求导致 DNS 查询和 SSL 连接到页面可交互时所用的时间——可交互是 [First Contentful Paint (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/First_contentful_paint) 之后的时间点，页面在 50ms 内响应用户的交互。如果主线程正在解析、编译和执行 JavaScript，则它不可用，因此无法及时（小于 50ms）响应用户交互。

   在我们的示例中，可能图像加载很快，但 `anotherscript.js` 文件可能是 2MB，而且用户的网络连接很慢。在这种情况下，用户可以非常快地看到页面，但是在下载、解析和执行脚本之前，就无法滚动。这不是一个好的用户体验。避免占用主线程，如下面的网页测试示例所示：

   ![通过快速连接，主线程被 JavaScript 文件下载、解析和执行占用](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work/visa_network.png)

   在本例中，DOM 内容加载过程花费了超过 1.5 秒的时间，主线程在这段时间内完全被占用，对单击事件或屏幕点击没有响应。

#### 渲染流程

1. 解析HTML、CSS生成DOM、CSSOM
![render-flow](/assets/images/render-flow.png)

2. 计算样式（Computed Style）

3. 布局（Layout)

4. 分层（Layer）

   使用css属性`will-change: transform;`

5. 绘制（Paint）

#### 回流和重绘

- 回流(Reflow)

  reflow 的本质就是重新计算 layout 树。

  当进行了会影响布局树的操作后，需要重新计算布局树，会引发 layout。

  为了避免连续的多次操作导致布局树反复计算，浏览器会合并这些操作，当 JS 代码全部完成后再进行统一计算。所以，改动属性造成的 reflow 是异步完成的。

  也同样因为如此，当 JS 获取布局属性时，就可能造成无法获取到最新的布局信息。

  浏览器在反复权衡下，最终决定获取属性立即 reflow。

- 重绘(Repaint)

  repaint 的本质就是重新根据分层信息计算了绘制指令。

  当改动了可见样式后，就需要重新计算，会引发 repaint。

  由于元素的布局信息也属于可见样式，所以 reflow 一定会引起 repaint。

- 为什么transform 的效率高

  因为 transform 既不会影响布局也不会影响绘制指令，它影响的只是渲染流程的最后一个「draw」阶段

  由于 draw 阶段在合成线程中，所以 transform 的变化几乎不会影响渲染主线程。反之，渲染主线程无论如何忙碌，也不会影响 transform 的变化。

## 其他

### 资源提示符

> 来源[哔哩哔哩@渡一](https://www.bilibili.com/video/BV13b4y1N7vm/?spm_id_from=..search-card.all.click&vd_source=4ced725888100ad76c64e6051da738dd)

| 资源符   | 介绍                                                         | 作用范围                       |
| -------- | ------------------------------------------------------------ | ------------------------------ |
| normal   | 默认的，不需要填写。会阻塞DOM加载                            | script，针对js                 |
| async    | 不阻塞DOM解析，script加载完成就立即执行，此时DOM可能还没有完全加载解析 | script，针对js                 |
| defer    | 不阻塞DOM解析，等待DOM解析完成再执行script，此时DOM一定加载完成了 | script，针对js                 |
| preload  | 不会阻塞页面，浏览器也会立即加载该资源                       | 任何资源，如脚本、样式、图片等 |
| prefetch | 不会阻塞页面，浏览器会在空闲是加载该资源。一般用作缓存预加载 | 任何资源，如脚本、样式、图片等 |

```js
// demo.js
(function () {
    const domList = document.querySelectorAll('p');
    console.log("el-p length: ", domList.length);

    window.addEventListener('DOMContentLoaded', () => {
        console.log('DOM fully loaded and parsed');
    })
})()
```

```html
<html>
<head>
    <script src="./demo.js"></script>
    <script src="./demo.js" async></script>
    <script src="./demo.js" defer></script>
    <!-- 如果type=module，默认就是defer模式 -->
    <!-- <script src="./1.js" type="module"></script> -->
    <!-- 立即获取style.css -->
    <link rel="preload" href="style.css" as="style">
    <!-- 空闲时获取theme.css -->
    <link rel="prefetch" href="theme.css" as="style">
</head>
    <body>
        <!-- 模拟10w个P元素 -->
     <p></p>
        <p></p>
        <p></p>
        ...p*100000
    </body>
</html>
```

|  模式  |        输出        | 介绍                                       |
| :----: | :----------------: | ------------------------------------------ |
| normal |   el-p length: 0   | 会阻塞DOM解析                              |
| async  | el-p length: 33611 | 不阻塞DOM解析，script加载完成就立即执行    |
| defer  | el-p length: 10000 | 不阻塞DOM解析，等待DOM解析完成再执行script |

> 运行结果：
>
> normal: 0
> async:    33611
> 100000
> DOM fully loaded and parsed
> DOM fully loaded and parsed
> DOM fully loaded and parsed

#### 打包体积分析优化

> 开源[哔哩哔哩@渡一](https://www.bilibili.com/video/BV1hC4y1r7JU/?spm_id_from=333.1007.tianma.4-1-11.click&vd_source=4ced725888100ad76c64e6051da738dd)