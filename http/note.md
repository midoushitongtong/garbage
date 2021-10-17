### 网络七层协议

- 应用层
  - 应用层常用协议
    - http
    - ftp
    - smtp
    - 等
- 表示层
- 会话层
- 传输控制层
  - 传输控制层常用协议
    - tcp
    - udp
    - 等
- 网络层
- 数据链路层
- 物理层

### tcp 协议

tcp 协议是什么: 面向连接的，可靠的传输协议

面向链接就是指: 三次握手, 传输数据, 四次分手

三次握手过程
C =>(Synchroize) S
S =>(Synchorize, Acknowledge Character) C
C =>(Acknowledge Character) S

三次握手后开始传输数据

四次分手过程
C =>(Finall) S
S =>(Acknowledge Character) C
S =>(Finall) C
C =>(Acknowledge Character) S

### socket 问题

问: 假如客户端向 ipA 建立了 65535 个 socket, 还能继续向 ipB 建立 socket 吗?
答: 可以向 ipB 建立 65535 个 socket, 并且不会和 ipA 冲突
