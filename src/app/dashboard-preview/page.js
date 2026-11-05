
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Home,
  Search,
  Compass,
  PenSquare,
  Bell,
  MessageCircle,
  Sparkles,
  Zap,
  BarChart3,
  Image as ImageIcon,
  Video,
  Smile,
  Heart,
  Repeat2,
  Bookmark,
  Share2,
  Plus,
  MoreHorizontal,
  ArrowRight,
  X,
  Send,
  Moon,
  TrendingUp,
  Users,
  Settings,
} from "lucide-react";

import styles from "../preview.module.css";

// ==========================================
// SIDEBAR MENU
// ==========================================

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: Compass, label: "Discover" },
  { icon: PenSquare, label: "Create" },
  { icon: Bell, label: "Notifications" },
  { icon: MessageCircle, label: "Messages" },
  { icon: Sparkles, label: "AI Tools" },
  { icon: Zap, label: "Automations" },
  { icon: BarChart3, label: "Analytics" },
];

// ==========================================
// DEMONSTRATION POSTS
// ==========================================

const initialPosts = [
  {
    id: 1,
    name: "Maya Chen",
    handle: "@mayachen",
    avatar: "MC",
    time: "2h",
    text:
      "Just launched a new content workflow with TreeChat! The automations and AI tools are a game changer. 🌱",
    likes: 312,
    comments: 24,
    reposts: 56,
    liked: false,
    bookmarked: false,
    followed: true,
    image: true,
  },
  {
    id: 2,
    name: "TreeChat",
    handle: "@treechat",
    avatar: "🌲",
    time: "4h",
    text:
      "Welcome to the future of AI, social media, and automation. Create, connect, and grow — all in one place. ✨",
    likes: 184,
    comments: 18,
    reposts: 31,
    liked: false,
    bookmarked: false,
    followed: true,
    image: false,
  },
  {
    id: 3,
    name: "Jordan Lee",
    handle: "@jordancreates",
    avatar: "JL",
    time: "6h",
    text:
      "Building creative projects is so much easier when your content, tools, and community are connected.",
    likes: 86,
    comments: 9,
    reposts: 12,
    liked: false,
    bookmarked: false,
    followed: false,
    image: false,
  },
];

// ==========================================
// TRENDING DATA
// ==========================================

const trendingTopics = [
  {
    tag: "#TreeChat",
    posts: "12.4K posts",
  },
  {
    tag: "#AICreators",
    posts: "8.7K posts",
  },
  {
    tag: "#SocialAutomation",
    posts: "5.1K posts",
  },
  {
    tag: "#BuildInPublic",
    posts: "3.8K posts",
  },
];

// ==========================================
// SUGGESTED ACCOUNTS
// ==========================================

const suggestedAccounts = [
  {
    name: "Tech Creators",
    handle: "@techcreators",
  },
  {
    name: "AI Daily",
    handle: "@aidaily",
  },
  {
    name: "Social Growth",
    handle: "@socialgrowth",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function DashboardPreview() {
  const [activeMenu, setActiveMenu] = useState("Home");

  const [activeTab, setActiveTab] = useState("For You");

  const [posts, setPosts] = useState(initialPosts);

  const [draft, setDraft] = useState("");

  const [search, setSearch] = useState("");

  const [following, setFollowing] = useState([]);

  const [showCreate, setShowCreate] = useState(false);

  const [notice, setNotice] = useState("");

  // ==========================================
  // CREATE POST
  // ==========================================

  function addPost(event) {
    event.preventDefault();

    if (!draft.trim()) return;

    const newPost = {
      id: Date.now(),
      name: "You",
      handle: "@you",
      avatar: "YO",
      time: "now",
      text: draft.trim(),
      likes: 0,
      comments: 0,
      reposts: 0,
      liked: false,
      bookmarked: false,
      followed: true,
      image: false,
    };

    setPosts((current) => [
      newPost,
      ...current,
    ]);

    setDraft("");
    setSearch("");
    setActiveTab("For You");
    setActiveMenu("Home");
    setShowCreate(false);

    setNotice("Your post was added to this preview.");
  }

  // ==========================================
  // LIKE POST
  // ==========================================

  function toggleLike(id) {
    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes:
                post.likes +
                (post.liked ? -1 : 1),
            }
          : post
      )
    );
  }

  // ==========================================
  // BOOKMARK POST
  // ==========================================

  function toggleBookmark(id) {
    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? {
              ...post,
              bookmarked: !post.bookmarked,
            }
          : post
      )
    );
  }

  // ==========================================
  // FOLLOW ACCOUNT
  // ==========================================

  function toggleFollow(handle) {
    setFollowing((current) =>
      current.includes(handle)
        ? current.filter(
            (item) => item !== handle
          )
        : [...current, handle]
    );
  }

  // ==========================================
  // FILTER POSTS
  // ==========================================

  const visiblePosts = posts.filter((post) => {
    const matchesSearch = [
      post.name,
      post.handle,
      post.text,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesTab =
      activeTab !== "Following" ||
      post.followed ||
      following.includes(post.handle);

    const matchesTrending =
      activeTab !== "Trending" ||
      post.likes >= 100;

    return (
      matchesSearch &&
      matchesTab &&
      matchesTrending
    );
  });

  // ==========================================
  // SIDEBAR CLICK
  // ==========================================

  function handleMenuClick(label) {
    setActiveMenu(label);

    if (label === "Create") {
      setShowCreate(true);
      return;
    }

    if (label === "Home") {
      setSearch("");
      setActiveTab("For You");
      return;
    }

    if (label === "Discover") {
      setActiveTab("Trending");
      return;
    }

    setNotice(
      `${label} is a visual preview. Its full functionality can be connected later.`
    );
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className={styles.dashboardPage}>
      {/* ======================================
          LEFT SIDEBAR
      ====================================== */}

      <aside className={styles.sidebar}>
        <Link
          href="/home"
          className={styles.brand}
        >
          <Image
            src="/treethree.png"
            width={38}
            height={38}
            alt="TreeChat Logo"
          />

          <span>TreeChat</span>
        </Link>

        <nav className={styles.sideMenu}>
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                type="button"
                key={item.label}
                onClick={() =>
                  handleMenuClick(item.label)
                }
                className={`${styles.sideItem} ${
                  activeMenu === item.label
                    ? styles.sideActive
                    : ""
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={1.8}
                  className={styles.sideIcon}
                  aria-hidden="true"
                />

                <span>{item.label}</span>

                {item.label ===
                  "Notifications" && (
                  <span
                    className={
                      styles.notificationCount
                    }
                  >
                    3
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* SPACES */}

        <div className={styles.sidebarSpaces}>
          <div
            className={
              styles.sidebarSpacesTitle
            }
          >
            <span>Your Spaces</span>
            <Plus size={17} />
          </div>

          <p>🟣 General</p>
          <p>🟢 Content</p>
          <p>🟠 Marketing</p>
        </div>

        {/* USER PROFILE */}

        <div className={styles.sidebarProfile}>
          <div className={styles.avatar}>
            YO
          </div>

          <div>
            <strong>Your Account</strong>
            <small>@you</small>
          </div>

          <MoreHorizontal size={20} />
        </div>
      </aside>

      {/* ======================================
          MAIN DASHBOARD
      ====================================== */}

      <div className={styles.dashboardMain}>
        {/* TOP HEADER */}

        <header
          className={
            styles.dashboardHeader
          }
        >
          <div className={styles.searchWrap}>
            <Search
              size={19}
              strokeWidth={1.8}
              aria-hidden="true"
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search posts, people, or topics..."
              aria-label="Search posts"
            />
          </div>

          <div className={styles.topActions}>
            <Moon size={20} />
            <Bell size={20} />
            <div className={styles.avatar}>
              YO
            </div>
          </div>
        </header>

        {/* CONTENT GRID */}

        <main
          className={
            styles.dashboardContent
          }
        >
          {/* ======================================
              CENTER FEED
          ====================================== */}

          <section className={styles.feed}>
            {/* WELCOME */}

            <div
              className={
                styles.dashboardWelcome
              }
            >
              <span
                className={styles.eyebrow}
              >
                YOUR WORKSPACE
              </span>

              <h1>
                Welcome to TreeChat{" "}
                <span>✦</span>
              </h1>

              <p>
                Discover, connect, and
                create something new.
              </p>
            </div>

            {/* ======================================
                POST COMPOSER
            ====================================== */}

            <form
              className={styles.composer}
              onSubmit={addPost}
            >
              <div
                className={
                  styles.composerTop
                }
              >
                <div
                  className={styles.avatar}
                >
                  YO
                </div>

                <textarea
                  value={draft}
                  onChange={(event) =>
                    setDraft(
                      event.target.value
                    )
                  }
                  placeholder="What's on your mind?"
                  maxLength={500}
                  rows={2}
                  aria-label="Write a post"
                />
              </div>

              <div
                className={
                  styles.composerBottom
                }
              >
                <div
                  className={
                    styles.composerTools
                  }
                >
                  <ImageIcon size={19} />
                  <Video size={19} />
                  <BarChart3 size={19} />
                  <Smile size={19} />
                </div>

                <button
                  className={
                    styles.postButton
                  }
                  type="submit"
                  disabled={
                    !draft.trim()
                  }
                >
                  Post
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>

            {/* ======================================
                FEED TABS
            ====================================== */}

            <div
              className={
                styles.feedTabs
              }
            >
              {[
                "For You",
                "Following",
                "Trending",
              ].map((tab) => (
                <button
                  type="button"
                  key={tab}
                  className={
                    activeTab === tab
                      ? styles.tabActive
                      : ""
                  }
                  onClick={() =>
                    setActiveTab(tab)
                  }
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* ======================================
                POSTS
            ====================================== */}

            <div className={styles.posts}>
              {visiblePosts.length ===
                0 && (
                <div
                  className={
                    styles.emptyFeed
                  }
                >
                  No posts match your
                  search or selected feed.
                </div>
              )}

              {visiblePosts.map(
                (post) => (
                  <article
                    className={
                      styles.postCard
                    }
                    key={post.id}
                  >
                    {/* AUTHOR */}

                    <div
                      className={
                        styles.postAuthor
                      }
                    >
                      <div
                        className={
                          styles.avatar
                        }
                      >
                        {post.avatar}
                      </div>

                      <div
                        className={
                          styles.postAuthorText
                        }
                      >
                        <strong>
                          {post.name}
                        </strong>

                        <span>
                          {post.handle}
                          {" · "}
                          {post.time}
                        </span>
                      </div>

                      <MoreHorizontal
                        size={20}
                        className={
                          styles.postMenu
                        }
                      />
                    </div>

                    {/* POST TEXT */}

                    <p
                      className={
                        styles.postText
                      }
                    >
                      {post.text}
                    </p>

                    {/* IMAGE PREVIEW */}

                    {post.image && (
                      <div
                        className={
                          styles.postArtwork
                        }
                      >
                        <div
                          className={
                            styles.artMoon
                          }
                        />

                        <Image
                          src="/treethree.png"
                          width={105}
                          height={105}
                          alt="TreeChat artwork"
                        />

                        <div
                          className={
                            styles.artWave
                          }
                        />
                      </div>
                    )}

                    {/* ACTION BUTTONS */}

                    <div
                      className={
                        styles.postActions
                      }
                    >
                      <button
                        type="button"
                        onClick={() =>
                          toggleLike(
                            post.id
                          )
                        }
                        className={
                          post.liked
                            ? styles.liked
                            : ""
                        }
                        aria-label={
                          post.liked
                            ? "Unlike post"
                            : "Like post"
                        }
                      >
                        <Heart
                          size={18}
                          fill={
                            post.liked
                              ? "currentColor"
                              : "none"
                          }
                        />
                        {post.likes}
                      </button>

                      <span>
                        <MessageCircle
                          size={18}
                        />
                        {post.comments}
                      </span>

                      <span>
                        <Repeat2
                          size={18}
                        />
                        {post.reposts}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          toggleBookmark(
                            post.id
                          )
                        }
                        aria-label={
                          post.bookmarked
                            ? "Remove bookmark"
                            : "Bookmark post"
                        }
                      >
                        <Bookmark
                          size={18}
                          fill={
                            post.bookmarked
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    </div>
                  </article>
                )
              )}
            </div>
          </section>

          {/* ======================================
              RIGHT SIDEBAR
          ====================================== */}

          <aside
            className={
              styles.rightSidebar
            }
          >
            {/* AI CREATION CARD */}

            <button
              type="button"
              className={styles.aiCard}
              onClick={() => {
                setActiveMenu("Create");
                setShowCreate(true);
              }}
            >
              <div
                className={
                  styles.aiSparkle
                }
              >
                <Sparkles size={31} />
              </div>

              <div>
                <strong>
                  Create with AI
                </strong>

                <p>
                  Generate ideas,
                  posts, and content.
                </p>
              </div>

              <ArrowRight size={18} />
            </button>

            {/* ANALYTICS */}

            <div
              className={styles.widget}
            >
              <div
                className={
                  styles.widgetTitle
                }
              >
                <h3>
                  Your Analytics
                </h3>

                <TrendingUp
                  size={18}
                />
              </div>

              <div
                className={
                  styles.analyticsRow
                }
              >
                <div
                  className={
                    styles.bars
                  }
                >
                  {[
                    30,
                    50,
                    80,
                    58,
                    95,
                  ].map(
                    (height, i) => (
                      <span
                        key={i}
                        style={{
                          height:
                            `${height}%`,
                        }}
                      />
                    )
                  )}
                </div>

                <div
                  className={
                    styles.analyticsText
                  }
                >
                  <strong>
                    +24%
                  </strong>

                  <small>
                    Example engagement
                  </small>
                </div>
              </div>
            </div>

            {/* TRENDING */}

            <div
              className={styles.widget}
            >
              <div
                className={
                  styles.widgetTitle
                }
              >
                <h3>
                  Trending
                </h3>

                <TrendingUp
                  size={18}
                />
              </div>

              {trendingTopics.map(
                (topic) => (
                  <button
                    key={topic.tag}
                    type="button"
                    className={
                      styles.trend
                    }
                    onClick={() => {
                      setSearch(
                        topic.tag
                      );
                      setActiveTab(
                        "For You"
                      );
                    }}
                  >
                    <strong>
                      {topic.tag}
                    </strong>

                    <small>
                      {topic.posts}
                    </small>
                  </button>
                )
              )}
            </div>

            {/* SUGGESTED ACCOUNTS */}

            <div
              className={styles.widget}
            >
              <div
                className={
                  styles.widgetTitle
                }
              >
                <h3>
                  Who to follow
                </h3>

                <Users size={18} />
              </div>

              {suggestedAccounts.map(
                (person) => (
                  <div
                    className={
                      styles.suggestion
                    }
                    key={
                      person.handle
                    }
                  >
                    <div>
                      <strong>
                        {person.name}
                      </strong>

                      <small>
                        {person.handle}
                      </small>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        toggleFollow(
                          person.handle
                        )
                      }
                    >
                      {following.includes(
                        person.handle
                      )
                        ? "Following"
                        : "Follow"}
                    </button>
                  </div>
                )
              )}
            </div>
          </aside>
        </main>
      </div>

      {/* ======================================
          STATUS NOTICE
      ====================================== */}

      {notice && (
        <div
          className={styles.previewNotice}
          role="status"
        >
          {notice}

          <button
            type="button"
            onClick={() =>
              setNotice("")
            }
            aria-label="Dismiss notice"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* ======================================
          CREATE MODAL
      ====================================== */}

      {showCreate && (
        <div
          className={
            styles.modalBackdrop
          }
          onClick={() =>
            setShowCreate(false)
          }
        >
          <div
            className={
              styles.createModal
            }
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-title"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className={
                styles.modalClose
              }
              onClick={() =>
                setShowCreate(false)
              }
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div
              className={
                styles.modalIcon
              }
            >
              <Sparkles size={32} />
            </div>

            <h2 id="create-title">
              Create something new.
            </h2>

            <p>
              Share your ideas with
              the TreeChat community.
              AI generation will be
              connected later.
            </p>

            <form onSubmit={addPost}>
              <textarea
                autoFocus
                value={draft}
                onChange={(event) =>
                  setDraft(
                    event.target.value
                  )
                }
                placeholder="What would you like to create?"
                rows={5}
                maxLength={500}
              />

              <button
                type="submit"
                className={
                  styles.loginSubmit
                }
                disabled={
                  !draft.trim()
                }
              >
                Publish Post
                <Send size={17} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
