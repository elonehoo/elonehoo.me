int cells = 12; // 每行的格子
int speed = 24; // 格/秒
for (int y = 0; y < cells; y++)
  for (int x = 0; x < cells; x++)
    image[y][x] = shade(x, y);

// 第 i 次调用
