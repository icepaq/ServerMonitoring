# API Docs

## /addserver
**Parameters**: Email, key, serverip, servername, latency threshold (ms), packet loss threshold (%)

**Return**: MongoDB confimration or Wrong Key

## /alerts
**Parameters**: Server, key

**Return**: alerts, down, highlatency, loss

## /checkCPU
**Paramters**: server, key, api key for server running RunCommand 

**Return**: Percentage

## /checkRAM
**Paramters**: server, key, api key for server running RunCommand

**Return**: total, used, free