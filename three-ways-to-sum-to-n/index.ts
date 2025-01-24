console.log(123);

// Complexity O(1)
function sum_to_n_a_1(n: number): number {
  return ((1 + n) * n) / 2;
}

// Complexity O(n)
function sum_to_n_a_2(n: number): number {
  if (n <= 1) {
    return n;
  }

  return n + sum_to_n_a_2(n - 1);
}

// Complexity O(n)
function sum_to_n_a_3(n: number): number {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}
