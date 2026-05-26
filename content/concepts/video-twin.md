---
title: "House Brain"
description: "The smart home layer built on HL addresses — every device, every switch, every sensor with a permanent, readable identity."
weight: 2
---

Smart home systems are full of entities named `light.thing3` and `switch.abc12345`.

Nobody knows what those mean. The system doesn't know what they mean. When you move or reconfigure, everything breaks.

HL fixes this by giving every device a real address before it gets added to any automation system.

`light.hm_lr_c1_a0` — House, Living Room, Center wall column 1, top position.

That name tells you exactly where the device is, what it controls, and how it fits into the larger space. It doesn't change when you update your hub software. It doesn't break when you replace the bulb. It's readable by a human, by an AI, and by any automation system.

**The result:** A smart home that any person — or any AI assistant — can understand without a manual.

[Read the Home Assistant Standard on GitHub →](https://github.com/Dvo77/spatial-vector-grammar/blob/main/docs/HL_HomeAssistant_Standard.md)
