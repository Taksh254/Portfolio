export interface NoteSection {
  number?: string;
  heading: string;
  body: string;
  diagram?: {
    caption: string;
    ascii?: string;
  };
  codeSnippet?: {
    language: string;
    code: string;
  };
}

export interface Note {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  readTime: string;
  category: string;
  summary: string;
  sections: NoteSection[];
  takeaway: string;
}

export const NOTES: Note[] = [
  {
    id: "understanding-attention-kv-cache",
    date: "08.31.26",
    title: "Understanding Attention & KV Caching Mechanics",
    subtitle: "Why autoregressive generation bottlenecks on memory bandwidth rather than compute.",
    readTime: "7 min read",
    category: "Neural Architecture & Hardware",
    summary:
      "A deep dive into why transformer inference shifts from compute-bound prefill to memory-bandwidth-bound token generation, and how KV cache paging prevents memory fragmentation.",
    sections: [
      {
        number: "01",
        heading: "The Duality of Prefill vs. Generation",
        body:
          "When an LLM processes a prompt (Prefill phase), all tokens are known simultaneously. The attention operation Q × K^T is a matrix-matrix multiplication (GEMM), which arithmetic intensity easily saturates GPU tensor cores.\n\nHowever, during Generation (decoding phase), we generate tokens one at a time. The query is a single vector (1 × d), while Keys and Values from all previous tokens must be repeatedly fetched from HBM (High Bandwidth Memory). This transforms the bottleneck from compute throughput (TFLOPs) to memory bandwidth (GB/s).",
        diagram: {
          caption: "Attention Matrix Memory Flow in Autoregressive Decoding",
          ascii: `[Prompt: N tokens]  ──(Parallel GEMM)──>  Full Compute Saturation (Compute-Bound)
[Gen Token 1]       ──(Fetch K,V)─────>  High Bandwidth Memory Read (Memory-Bound)
[Gen Token 2]       ──(Fetch K,V)─────>  High Bandwidth Memory Read
...
[Gen Token N]       ──(Fetch K,V)─────>  KV Cache grows linearly: O(N * L * H * D)`,
        },
      },
      {
        number: "02",
        heading: "The KV Cache Equation",
        body:
          "For each layer and attention head, we must store the key and value projections for every generated token so we do not recompute past states from scratch. The memory required scales linearly with batch size, context length, number of layers, and hidden dimension size:\n\nMemory_KV = 2 × b × s × l × h × d × bytes_per_element\n\nFor a 70B parameter model with 16k context and 16-bit precision, the KV cache per concurrent request can exceed 24 GB of VRAM alone.",
        codeSnippet: {
          language: "python",
          code: `# Standard Scaled Dot-Product Attention with KV Cache
def forward_step(q_t, k_cache, v_cache, new_k, new_v):
    # Append new key/value projections to cache
    k_cache = torch.cat([k_cache, new_k], dim=-2)
    v_cache = torch.cat([v_cache, new_v], dim=-2)
    
    # Calculate attention scores with all cached keys
    scores = torch.matmul(q_t, k_cache.transpose(-1, -2)) / math.sqrt(d_k)
    weights = F.softmax(scores, dim=-1)
    
    # Weighted sum of cached values
    out = torch.matmul(weights, v_cache)
    return out, k_cache, v_cache`,
        },
      },
      {
        number: "03",
        heading: "Paged Attention & Virtual Memory Analogy",
        body:
          "Traditional memory allocators require contiguous VRAM allocations for dynamic KV growth, resulting in 60-80% memory waste due to external fragmentation and over-reservation. PagedAttention solves this by borrowing the virtual memory concept from Operating Systems: splitting KV tensors into fixed-size blocks allocated on-demand via a block table mapping.",
      },
    ],
    takeaway:
      "To deploy LLMs efficiently, optimize KV cache layout (GQA, MLA, PagedAttention) before touching model weights. Inference is a memory subsystem problem disguised as a math problem.",
  },
  {
    id: "how-embeddings-actually-work",
    date: "08.28.26",
    title: "How Embeddings Actually Work in High-Dimensional Manifolds",
    subtitle: "Geometric intuition, the curse of dimensionality, and cosine similarity collapse.",
    readTime: "6 min read",
    category: "Vector Spaces & Geometry",
    summary:
      "Exploring why high-dimensional vectors behave counterintuitively, why most points concentrate on the hypersphere crust, and how to avoid embedding collapse in retrieval systems.",
    sections: [
      {
        number: "01",
        heading: "The Strange Geometry of 1536 Dimensions",
        body:
          "In a 3D sphere, the majority of volume is inside the body. In a 1536-dimensional space (standard OpenAI embedding dimension), virtually 99.999% of the volume resides in an infinitesimally thin outer crust.\n\nFurthermore, any two randomly sampled vectors in high dimensions are nearly orthogonal (dot product ≈ 0). This property gives embedding models the astonishing capacity to separate millions of distinct concepts without overlapping.",
        diagram: {
          caption: "Hypersphere Volume Concentration as Dimensions -> ∞",
          ascii: `Dim = 2 (Circle):        [    Interior Heavy    ]
Dim = 3 (Sphere):        [   Balanced Shell     ]
Dim = 1536 (Hypersphere): [ == 99.99% Mass in Outer 0.001% Shell == ]`,
        },
      },
      {
        number: "02",
        heading: "Anisotropy & The Narrow Cone Problem",
        body:
          "A frequent bug in semantic search is the 'narrow cone' phenomenon (anisotropy). Neural networks often map text embeddings into a small cone of the vector space rather than utilizing the full hypersphere. As a result, unrelated texts can have a falsely high cosine similarity (e.g., 0.82), collapsing dynamic range.",
      },
    ],
    takeaway:
      "Never rely solely on raw cosine thresholds without normalization and whitening (PCA/ZCA) when building production RAG pipelines.",
  },
  {
    id: "building-autonomous-agents",
    date: "08.25.26",
    title: "Building Autonomous Multi-Agent Orchestrators",
    subtitle: "From fragile sequential loops to deterministic statecharts and verification loops.",
    readTime: "8 min read",
    category: "Agent Architecture",
    summary:
      "Why naive ReAct loops fail on real-world engineering tasks and how state-machine-driven agent topologies produce robust, repeatable outputs.",
    sections: [
      {
        number: "01",
        heading: "The Failure Mode of Unconstrained ReAct Loops",
        body:
          "When you prompt an LLM in a loop with tools: 'Thought -> Action -> Observation', it excels on 2-step tasks. But by step 6, compounding context drift, hallucinated arguments, and tool error loops cause catastrophic task divergence.\n\nReliable agents treat the LLM as an untrusted reasoning engine inside a strictly typed finite state machine (FSM).",
        diagram: {
          caption: "Deterministic Agent State Machine Topology",
          ascii: `[PLANNING] ──> [DISPATCH] ──> [PARALLEL EXECUTION]
    ▲                                    │
    │ (Validation Failed)                ▼
[REPLAN] <─── [CRITIQUE / SYNTHESIS] <───┘
                       │ (Passed)
                       ▼
                 [FINAL EMIT]`,
        },
      },
      {
        number: "02",
        heading: "Strict Schemas & Tool Contract Validation",
        body:
          "Every tool call must pass runtime Pydantic / Zod schema validation before execution. If validation fails, the error message is fed back to the model as an explicit compiler diagnostic, allowing the agent to self-correct its parameters deterministically.",
      },
    ],
    takeaway:
      "Do not build agents around open-ended natural language prompts. Build them around structured graphs, typed state boundaries, and automated critique barriers.",
  },
  {
    id: "understanding-backprop-computation-graphs",
    date: "08.21.26",
    title: "Understanding Backpropagation from First Principles",
    subtitle: "Reverse-mode automatic differentiation through directed acyclic computation graphs.",
    readTime: "5 min read",
    category: "Deep Learning Foundations",
    summary:
      "Breaking down how scalar and tensor tape-based autograd engines trace forward passes to evaluate multivariate chain rule gradients in O(1) backward passes.",
    sections: [
      {
        number: "01",
        heading: "Forward Pass as Graph Construction",
        body:
          "Every mathematical operation between tensors builds a Directed Acyclic Graph (DAG) of dependencies. Each node stores its forward value and a local derivative closure function (vjp - vector-Jacobian product).\n\nWhen we invoke .backward() on the loss scalar, topological sorting traverses the graph in reverse order, accumulating gradients at each leaf node.",
        codeSnippet: {
          language: "python",
          code: `class Value:
    def __init__(self, data, _children=(), _op=""):
        self.data = data
        self.grad = 0.0
        self._backward = lambda: None
        self._prev = set(_children)
        self._op = _op

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data * other.data, (self, other), "*")
        def _backward():
            self.grad += other.data * out.grad
            other.grad += self.data * out.grad
        out._backward = _backward
        return out`,
        },
      },
    ],
    takeaway:
      "Writing a micrograd engine in under 100 lines of Python permanently demystifies deep learning frameworks and gradient accumulation mechanics.",
  },
];
