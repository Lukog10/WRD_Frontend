/**
 * WRD Mock Data
 * Static data for all screens based on Stitch designs
 */

export interface ClothingItem {
  id: string;
  name: string;
  fabric: string;
  occasion: string;
  category: 'indian' | 'western' | 'footwear' | 'accessories';
  image: string;
  isFavorite?: boolean;
}

export interface OutfitSuggestion {
  id: string;
  name: string;
  category: string;
  description: string;
  occasion: string;
  weather: string;
  lastWorn: string;
  fabricTag: string;
  image: string;
  items: string[];
}

export interface MoodBoard {
  id: string;
  name: string;
  itemCount: number;
  subtitle?: string;
  lastUpdated?: string;
  images: string[];
  overflowCount?: number;
}

export interface CalendarEvent {
  id: string;
  date: string;
  dayLabel: string;
  dateNum: number;
  hasEvent: boolean;
  eventTag?: string;
  outfit?: {
    name: string;
    occasion: string;
    fabric: string;
    careLevel: string;
    image: string;
  };
}

export interface RecommendationCard {
  id: string;
  name: string;
  matchesBoard: string;
  image: string;
}

// ========== CLOSET ITEMS ==========
export const closetItems: ClothingItem[] = [
  {
    id: '1',
    name: 'Beige Kurta',
    fabric: 'Cotton',
    occasion: 'Festive',
    category: 'indian',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK0Jsf8NB7HOSZWTdtQOu1JlE5cOafRtoiIomT--QXEzb1wlqrc3LH9Sdyerz_wNM9FEyptGfGh41ytcwWbv2rzs8kgx8YN6JuelQFeSPzaPjpcfmkHfvuW9_RfedTWaBQb9_E6Rw7PdGJ3c46DMnnjoh-smilH5gkoPtJJTLR6bpdOD5efg-u_1B0sUT01Fdkn8iZ8n1sTwQKAMgssiwPGvwX6YNbpvtcFMMNmcyJNY5zgCUrc0AYjUQXswT8ooBL3o4-jpABYq0',
  },
  {
    id: '2',
    name: 'Raw Indigo Denim',
    fabric: 'Cotton',
    occasion: 'Casual',
    category: 'western',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMd1VzCdzu0taiXQnv2J9UL2cICEabx0V48UzCbvTiLyUvNU2zaDDT1TPVZgehEYygBEoPWEmpAq3YkoyRm_0FJwl27LaLeWQ-54WAfBItu-Fwg2sQAy4KEBtt6Ng4TbeR2ueDgt2oF6SzeP58InRq6kGBHxXrijIapqwaliXPbWzImAzdvvhnehdk_hlcaof07FgsLDQuMEMtoAsoyuF8QZw1TgMTA39FjLdQ2WCp24RKTB7z0rTxknxeKPrHN9F8Ql8xUVDPEq4',
  },
  {
    id: '3',
    name: 'Silk Modi Jacket',
    fabric: 'Silk',
    occasion: 'Wedding',
    category: 'indian',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBozTayjHgJ3Xnqa7SvaztnOfzdHspKF5KFLBhZPVTTtCyblWwya0KBDy8JTLertpdsF6vEZPI57hCF06OguOru70sXEekSR1H1S9GIoTTh9u9e2ss-3zSpBMdZBp3O9GteU2OWFG3k1lASuKRre_Tf11liQkCnGdzh6fy5bBLZvjPlvzDK33_UN0lp8EZNsf0rw0Dhfo8IWsErx5DA3rGX9JOt69Ue0TPcX_fS1JoUZFetWJVFk4N-Sjgnj2cnj0tQJPQEeXOXT7k',
  },
  {
    id: '4',
    name: 'Minimalist Lows',
    fabric: 'Leather',
    occasion: 'Versatile',
    category: 'footwear',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnqrwZ1pCb4HRcohefEKlz0ndLbL-9ifhfZjpJ6oYGkUKqsMqKRKEWB8ssw3F5EfbIx-OgNn7OVIn11nw3BQG8NWS2cOXosrZ9wAy55KrzCezmX05ou2zckOxkiUnVTePnmvCExQuxm436oFXa4fBZyeWt4ZhOEv07p4aMVDw36-GXKZ9-CNl_YGUVCqzfFezEP97etsE2XLfOdEV1_DH2oiZzos66xnbYXi9dr31XjKExbDenk6kiH0G0JuHfvdQOIeingVeE6aw',
  },
  {
    id: '5',
    name: 'Essential White',
    fabric: 'Cotton',
    occasion: 'Formal',
    category: 'western',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp0jKHJ5h_YsDtW9e7VWd5SPwsrbiSdX0aX_zPNar0pmVE3q1OYP1vMazyMU_dP7ydvQOui7elx6qS3JQiaPBdV-zg9cYU0CICrXU7_tx1S3dI8CC-aXlh-s9p0f2f_E0lXBOs3--nzK4kOFIg6ZnkvUfRUD1dq8Xho6Vgj6w4XQrnGRDpxkN0nGy6tw6l7DL5JQ7wlQkxU1bUAa5kXUCtB804OCxG_cMkCdXSsNi_0rypFs_EwRBH49bAMEOTrPxcjkvzsES35Mo',
  },
  {
    id: '6',
    name: 'Linen Chinos',
    fabric: 'Linen',
    occasion: 'Summer',
    category: 'western',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0MjRmqL-2Rm8VnY2RsqSoz2CVdYxHlbCMSrpDpK85HuYaCoeUNcuwKVxwDJQaE9szeTsaBrr5K1_McrP4H_d5uDOS9o4kGZG3a3qJrMb3xOrX4OBV6R8meL7tt79-PsdHpXfJOUDEqjHoB5jfcJ9PWB20-imnIWLO8Xk4idBN9mAgrQphzYEvdd-eCGL1wO4eAShiyi_sFZ-XVBAPO668cug4pfI3VoKvn1vP6T10bMFeuHxobSIkRKeYx3TRRU_kkUB_Yyo8oFU',
  },
];

// ========== OUTFIT BUILDER ITEMS ==========
export const builderItems: ClothingItem[] = [
  {
    id: 'b1',
    name: 'White Nehru Shirt',
    fabric: 'Cotton',
    occasion: 'Formal',
    category: 'indian',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa3Nj6rEgNmxC6iQjVE_HusSieAdBMbDjRtiFSfnhNQ1-43v8gEmucm50c5BFjoTHhLZBy6mNyaMwEuTP7KOCDG7y8lL1LSu-vr8yNSgElmcxHY-rKHLtGuGNHbNfcRVl5ebs4qNCEmTu0Ea8ZNQoHWZfaivnxr6LLyg96KRvp63uoR4lITJ9TO6mAeaxdIaI_gx1AP-sSEwAh1_w90ZYVczEhnZ-TaCR_smT0ztdE3-48ORYVWSbuzSnoN0ZCg8JUhwwwUKUHyVk',
  },
  {
    id: 'b2',
    name: 'Olive Chinos',
    fabric: 'Linen',
    occasion: 'Casual',
    category: 'western',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyh45mYLXsnHtU12ntxHBBj9DbAE_R2h9HYHM6Ad8Hc6c0HOj1vlD-qxysfMi0d0nwsw89SbXMAKAtK7yboVn0RetL4438zY1HCNaYbPK4SFFy2QJQ3pvnb7zusCNKIjb89vzE0KorjWioPZTSfivS0n4Zjc9eLakzD_N5hMqxVpEyCHktHWBz4BD2yzdiZ2bT7T0Dx1gWYUw5neg3WyiwUMgWZ9Y01iI4VsXZoP4aoVD0yPYpEmwBv-JRwcLSKxbSOBB98R4o_78',
  },
  {
    id: 'b3',
    name: 'Tan Peshawari',
    fabric: 'Leather',
    occasion: 'Ethnic',
    category: 'footwear',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK8bkUJbv-fMbmJ9jqPTL8L19-Dp8lLHlLICg4B4v1NcJy1bpD4vhm9JfuGxLRFdN46Xg51GscXsCZjDZbhj2NfvPe_hxBjX05j1YOdCIO1yWVDIOIronx8h1uydrLrW_3EQ9luI10lDoqXFXqaj2kK2LGWfJMEkmjpGQacle3pRlrwvmJEXx5_lRCqgg8aSfxi3Cq7sRSJkfL4Za-knNIUQDKLVYL0SHh8GFRujichsFquMGZfrGp6jDr7fr779YMNvk7Onfjzcg',
  },
  {
    id: 'b4',
    name: 'Indigo Stole',
    fabric: 'Cotton',
    occasion: 'Ethnic',
    category: 'accessories',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2nmWaqWYvBNXMKgPAcn2qFzFhgNqq0IQo4mO9QMlMHEHT-9NZZ48TI9YKr4eNP9sxynEz9ZXgjgzy5MJf28G37Sa3z_CPcCd4rKWDsVv8HRP70Kxh79rCkPBUpGbPh02haVEI8C9l9anj8_IjbTGR985TKqcNGY57seTxAzxwfyILJK9QVM_hvTWwG7vkHsA-w1UfNIHpABrZpS4WN_FEQF4MU5hHMvo7M2Smhp9jiGm9QPLcQvyU--eYmULT-RBaGMwPvbsn7iU',
  },
];

// ========== OUTFIT SUGGESTIONS (for Thari AI swipe) ==========
export const outfitSuggestions: OutfitSuggestion[] = [
  {
    id: 'os1',
    name: 'The Royal Linen Ensemble',
    category: 'FESTIVE FORMAL',
    description: 'Beige Linen Kurta • Navy Waistcoat',
    occasion: "Friend's Engagement",
    weather: '28°C',
    lastWorn: 'Never',
    fabricTag: 'Silk',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1IrT7srBk1BiP0HANULFgIEkdVYDpTJblXfHo2HrC1KG6sf25elXdr4nduqRTljlHsDebN9DKdTq5IOzrdLYZYYTqlSepkVziInQLCpMlE5jhPwrBNTmHyzCT_AYQL_sqfC6KCuIZyxxnfF1SV229YNVXKugkQ4LQu5jbIjdl8F783573W2FjQcWf6vIJuThgNcgbdOa9L9rtjrWmNkk6IQ-8CpvOr33qM9BZxzhBCV4NWbLHYRc8Ml5M0N00EPT0RyhddlO4WN4',
    items: ['Beige Linen Kurta', 'Navy Waistcoat', 'Brown Loafers'],
  },
  {
    id: 'os2',
    name: 'Summer Office Sharp',
    category: 'OFFICE CASUAL',
    description: 'White Oxford • Olive Chinos',
    occasion: 'Monday Meeting',
    weather: '31°C',
    lastWorn: '2 weeks ago',
    fabricTag: 'Cotton',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD63XDqygq17z1DEBAJqyAEpyYsR3FzOpLq3c0jeEgEZ_rQliu-xuTXknwVg0FjQOvKYC0TN7X0T0Ih2qyGbUq3ZzcOHxXiU4Brm6mzz3w6dh-1XKOfeNI4-FB2ckX6naxVwvknPoXC3Zx64sC0X_GNcd4nO-8EAGcmDjs4SapjHKPQemVog46TOk69d4S9jgoPH6bKhFreBkT8GeVC6Jr70raMDQjjTj8qKSWL-SGq6XO1PFjRkD-e4WG5cL6RK9vMJvYTeWKOFYE',
    items: ['White Oxford', 'Olive Chinos', 'Leather Belt'],
  },
  {
    id: 'os3',
    name: 'Festive Diwali Look',
    category: 'FESTIVE ETHNIC',
    description: 'Terracotta Silk Kurta • Gold Embroidery',
    occasion: 'Diwali Party',
    weather: '29°C',
    lastWorn: 'Never',
    fabricTag: 'Raw Silk',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCloT0lvFF-tiR6IYy1s0kUeLzKMcsnrHHItjABsEC1wtMRrHydj0cRYRZ-l1dJJUOPEFSPpd__HoVDwNCMV_yW0AQ8dPoxDM8lqVZRXaRuLOQwdVXKh2L6Po0jV3DqWA_x6RTIsW-eWAC-l2AQqWFowtnHZXJzVgy2GV3xpTlhMpwg64GpGH7rXYikalqqfjjrbG2wjw06NlVKHJvP4kr9wZF-mfbaLVVA9zPy4A1Dyp9GUCS8lRTIpCbKVZ5fw85tjxQoSC86QnI',
    items: ['Terracotta Kurta', 'Nehru Jacket', 'Mojari'],
  },
];

// ========== MOOD BOARDS ==========
export const moodBoards: MoodBoard[] = [
  {
    id: 'mb1',
    name: 'Festive Wear',
    itemCount: 12,
    lastUpdated: '2d ago',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCukDyif8pJ1Jh_9x32_jOOoFdErOtHlv5dfqeVkuSavTamrbIMsXbIUQeAu1i_RG7veC16jRv0Uo9wuDFK6hEjkYdGWYmYN3kxHse1VuetbEjnZLNr4f5l_sHWau1yDZL2NxCjm7hN8OuOrOVrlTiXPG0Bym3nyyNvOBo4UPgRWW_AuF-r8X2UIkWKKPbGxNirwxgcl9HaHA4qtzCM6eqGcniShtb8zrhui0eS2qCZkNiNO9s3Fr47250kBzFsdqRH5UGODGMNnoI',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAX2h8NJemmfS8arhdc8ZI3RDhP2aV91c6Dv3uABeTIQECMad1WsC9XB7RoXG6BdyoTs1Ok_P7O9c0dyJ6rL-Dyzg6FnO7-AX0GVQGLiuUAu6NJG4Y9FtFhOdIS-Q1zAnvuTHCPlgFfjJrCtOJ62P1LC5f5YhC3hrSzYgW_kvFzhKpDCA36o-6jiLAxsjDF6D_h11EaL7MdDjVjum3jPo9epXq5fRxu8ZpvkKaM-EpXpVu5TU_N0TJlSkXTqpA62Eh3Uae949HINY0',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBUKLoUlYPNZfiylz9vA2uUmE8tEIXR1bd2cnfj2KTW4QDSbPg3J-7K5bbC1AGLfLrhs2kteReceaWLthfccBk79Io6uRlnEMHG2AQ-Y8h51pL7Exv3bHyhideT2Pr-p1TcFy9Rrt8apwCa7Ll74DuaHZRyK2qKn9bSFiVKsJlg0QDMaYRJQcV837Tb24JuqwTaYO8Ae1pIWqEMiQb0Mqy7ljkEXXn-BdYchVv9K9CvWpisau2nOLUiiViJgJnfydge4cXKTi4xpdM',
    ],
    overflowCount: 9,
  },
  {
    id: 'mb2',
    name: 'Office',
    itemCount: 5,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB_Qt8eU0hVhxgQPzK9XsnWvwTwjWhX1pMiXHU6zzZ1zZAqygU8rFxmIj42aReOonyGGXdnoszGj3_vSiVuRbVOh_l67DOVdlF1YUxAKcsloYkyE7u8ShJbtfg-vNGwzNnE7Wltpn-W8mjIrUrFBXw0PW2MQKRTceq4IRwsV1YVb-krI5Q2YReJqANtCcRYFbFIo3FjHgYJpHtxgpinHc5rJNstTvEP55arVfn2Mq-UGhbx2J_hjnMAbWVtZD60kxO_HyU3n2_tmJo',
    ],
  },
  {
    id: 'mb3',
    name: 'Wedding',
    itemCount: 24,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCXQPPAB8Xlg249YWgscRHt17MU_SHwR7kOEcqBYVJYZD-37EHW5GkDeNChWojFXFDwpFlqLutqlK0eMkr8jN60Nhb8O9jrUp67MQgkue2KsBniztVrkZuv97ivq__ijr485ZTRedc6a3bOWV_GPeJiJrw7LhzSSfYX_AAIalz2DyDWQw8C4o-IOF_QE5JvgYUglDGlewN5iq3IWdykoG0cJx_NgLZkdiuyGiREt_sNRW7hYa6V-NsZhWvIHPV0vui2-4_RPtpIi8I',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDLctwxBDptpnj9DxOPx_IOOeWX1iXd3H0J54sSyke8UXtIMqkkzROKa_PBycojzxxdQjmPdYYe5VI-Avzc1GiS3FfXAz8VA7SE8u5a1ymb_WljXEzGLnChiG8maJ4U6M5DzY-_JVRM6Q-NMxjP-Wmpz5xE22fqTvdENYPl2DRcYpxglVTvmRiRy61GWHzLE8YxL9CJRj_7vAbE6vMyQRwZVihfEI0g3-xpbikSngESL9S3LYYXdcryEgB1Uk6i9FHX45LojuGirg8',
    ],
  },
  {
    id: 'mb4',
    name: 'Weekend Brunch',
    itemCount: 8,
    subtitle: 'Casual Vibes',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCeGolakqzz-0c78vSGFQ76dbd1jb_FCZaZfpw2r7YK0ypd9gCc-kjWyEFQJr0KWvMfbYztbjjYO2nKNFrUjqZK2uC1uBWPbQd25e_NyHN4H1WNxE_6q-qtbF0p6OJPglFsI28aTDElhuXB9z764DjIWUonI-FMXZXn9NVx4foqGYNWhzmmp7aNQe224bmNPfcdNE7dac--wi0ELB7g6tbRkL6u9X2xgsExZt_sAvGe91iy3yxU7cPSpVz4kROusOpNfQQsFQKM1ts',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAdj-Og0oJuPAf5xmujDVLFD6ExwD9i6XzlgBG2uCzRAo2AGfhZdNjBr74NlrOoveui6cOWNmOiABSIcrIDMqi5Mx273Kpdwi8idIiagIpx66hw-Xxz0wUEeEfvjipm7CXHYMD6b_hmy04JstM0i_3I_ZP9OBw5H0kT1sz8YRZXHJCOFBS5w4-sHaxkbJpl9yqcB5sMNkLdV2r56j3naMfWFyAQPYM5hjZLpz6M4WP8Z-BbBnZSANO5nQfwY6ZjkXNK6nSVpeE5VUA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC516NZmcFXtaewcs_menMJ3YfdtJWdRW0Q54AcFG0mnmMNaN-tDpTgncDPiZI4czq34b2NHxM6u3RnxXffihZfWfD3uIewJgldR4UOWVUBZxzqvo9o5UMhiGWC2gp6K8wQTBkIJpeRDV7WBh_WGuhEMwDnjOCJi9QQsjTrC_bwdrjNCjAfEn5s8D_jJMlXGJ9_1wyVhzUoaem9RnH3qinmTW_gVlLHtIAth6wxhskSEsT99X9rHAsBPW5tiP23L1Izz3c010LJ2qs',
    ],
  },
];

// ========== AI RECOMMENDATIONS ==========
export const aiRecommendations: RecommendationCard[] = [
  {
    id: 'rc1',
    name: 'Silk Waistcoat',
    matchesBoard: 'MATCHES FESTIVE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC44tRK0EL8-r22BHSq8NirTJG1sNgZzr_aC9soqS96_ueGmrfJ1batFp802l0o9L3ryiZJYWeIO8lJSJCna0-ixRy70ItW2PQVeDHujXkH4_AJTxPFxdXmICwqjzO6RDkJXh8txms-U3r4V8KmR-yYX-Stylb3TY3VS6UfYxz75Kv5JP6xpMoUsU_KHs3Via_qJebEpjX9zFe4I2cfBBY0OSzYiBRGMVaFBEQ-uTHJ-Xbj2bfx-jFtL7_BWagUdPlE0wwe2UW8Yf4',
  },
  {
    id: 'rc2',
    name: 'Linen Ensemble',
    matchesBoard: 'MATCHES OFFICE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD63XDqygq17z1DEBAJqyAEpyYsR3FzOpLq3c0jeEgEZ_rQliu-xuTXknwVg0FjQOvKYC0TN7X0T0Ih2qyGbUq3ZzcOHxXiU4Brm6mzz3w6dh-1XKOfeNI4-FB2ckX6naxVwvknPoXC3Zx64sC0X_GNcd4nO-8EAGcmDjs4SapjHKPQemVog46TOk69d4S9jgoPH6bKhFreBkT8GeVC6Jr70raMDQjjTj8qKSWL-SGq6XO1PFjRkD-e4WG5cL6RK9vMJvYTeWKOFYE',
  },
  {
    id: 'rc3',
    name: 'Bandhani Wrap',
    matchesBoard: 'MATCHES BRUNCH',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCJhuLDPNNMQvYzS_b69ZrI5Qe3yBuXmklgodSuwqH-YyrZN9AbeRY1IciCsL51uf2Ui9xgtB3LG-Og3YMCkhTGtcdYoEG1nDozCcrWNPmnDuZ5oMkpFjUEySbHF1THG0C2B22bh30hHPe4xEkLQTEdbYy8UHxrmzwRpA4ExjKK3zJg0zXIxKFt2WP6UE4nUIdWEXHH0_Z7Xg3O3BgjN_9pieYIQI5W1__QFlGct6Anp5B0vCHbGtGw-ve0OxnIT3Jla32soNOvQ0',
  },
];

// ========== CALENDAR EVENTS ==========
export const calendarDays: CalendarEvent[] = [
  { id: 'cd1', date: '2024-10-21', dayLabel: 'MON', dateNum: 21, hasEvent: false },
  { id: 'cd2', date: '2024-10-22', dayLabel: 'TUE', dateNum: 22, hasEvent: false },
  { id: 'cd3', date: '2024-10-23', dayLabel: 'WED', dateNum: 23, hasEvent: true },
  {
    id: 'cd4',
    date: '2024-10-24',
    dayLabel: 'THU',
    dateNum: 24,
    hasEvent: true,
    eventTag: 'DIWALI EVE',
    outfit: {
      name: 'Festive Fusion',
      occasion: 'Diwali Party',
      fabric: 'Raw Silk',
      careLevel: 'Iron Level: High',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCloT0lvFF-tiR6IYy1s0kUeLzKMcsnrHHItjABsEC1wtMRrHydj0cRYRZ-l1dJJUOPEFSPpd__HoVDwNCMV_yW0AQ8dPoxDM8lqVZRXaRuLOQwdVXKh2L6Po0jV3DqWA_x6RTIsW-eWAC-l2AQqWFowtnHZXJzVgy2GV3xpTlhMpwg64GpGH7rXYikalqqfjjrbG2wjw06NlVKHJvP4kr9wZF-mfbaLVVA9zPy4A1Dyp9GUCS8lRTIpCbKVZ5fw85tjxQoSC86QnI',
    },
  },
  { id: 'cd5', date: '2024-10-25', dayLabel: 'FRI', dateNum: 25, hasEvent: false },
  { id: 'cd6', date: '2024-10-26', dayLabel: 'SAT', dateNum: 26, hasEvent: false },
  { id: 'cd7', date: '2024-10-27', dayLabel: 'SUN', dateNum: 27, hasEvent: false },
];

// ========== TODAY'S OUTFIT ==========
export const todayOutfit = {
  name: 'Sophisticated Festive Mix',
  items: [
    {
      name: 'Navy Silk Kurta',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsqyD2xAjMah1jX28nnKm3ub3D1gXNi0NmEtwhNdGPmTf_II-MJKFU-b3A40br09_6-JYGKzU7WLCruS5k2vp118swOMOUOs57ZAf_EpUDbvZMkjQnYFLK1g1ef3nQtWjfCare0XXm-CPu2KIefWKFEmhy3TKpI5KCF-X44lDd7QNs19aLS9mcnCh9tKarmid2wiQTNDn0t32_Rhxz149LkJRVsWqTcRg9pTNh8KYL_YKP3C-V44zzx1z-yolXffvOum9hLHNov3g',
    },
    {
      name: 'Beige Chinos',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD54AZPBABIu6B5_v-w1dXCaM3_g3eyw5R_3rmUGVzFEPw_F03Dh7hPBFRIqJUklJjF1jKRCmY75T026XxQkMiG6UntHDWd-U8GYaVJ3c3Au8o3pZf1PW3bIjjliM2EpDzrbccMQ0fB2uZwkzt-GHIZoo-r6RkTKgmgEGTbtVozS-Zz9EgKsD9csH48JiYF9ljGUx1n16e2HiO2QKZDIDTF377XIg3fcP6MqAe7GZeDZkgGNj2hA8aP4NvJ0fuSlJOdKJZZ7Tv6Hic',
    },
  ],
};

// ========== WEATHER ==========
export const weatherData = {
  location: 'Mumbai, Maharashtra',
  temperature: 32,
  condition: 'Sunny',
  humidity: 82,
  feelsLike: 36,
  tip: '"Perfect for a linen Kurta today. Stay cool and sophisticated."',
};

// ========== STATS ==========
export const sustainabilityStats = {
  repetitionScore: { value: 84, change: '+12%', unit: 'pts' },
  costPerWear: { value: '₹142', level: 'Low', unit: '/day' },
};

// ========== RECOMMENDATION WIDGET ==========
export const recommendationWidget = {
  title: 'Missing something?',
  description: 'A rose gold watch would perfectly complete your',
  highlightText: 'Festive Linen',
  suffix: 'look from yesterday.',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEsgTd6GxsZPMNpPNc9PhKamtiD0RxmcKoewcF-LvM-7g2dX4i2k6l-75IQKYP8LdATIRxhL3ELzkfpc4Gt4vc-4PsjR6IMjIPd89EAd0KuDC4GJAiIxu009noxjaDpujs2gHwBiqEZfRHKnbuwR8oJ-k085fTPQMx6OcwGk1M6KDZxzikwS6VC_vuqinKdhvykJ7RX_iHoQjvMMk1q7hwhcAllAqdpJV3V4wuY_5bkEDqeGnyLksDdOMSBq0mFIe4q7EU6H4uPn0',
};

// ========== PROFILE ==========
export const userProfile = {
  name: 'Avinash',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOoZGks25WmLSdl-vfsIuiXjD8wxK3ACYanCAFIoGI_CG7xu8hS9wtS521sZAkrfoLCJGH_79xUhlvcmQvzv88-egY0ZHOdbu6-1bL-WxTY0NK-iPgjxSAW2UEspDhgLh1GpE0XWi0NG8Ka2jNXFk_U-mfFTJvev3Z462vL1511WDgbTKGwjU9s7AaMpn4Wov9XWtcvKXzxWgrDHj4cVlLlZD3h7YlRB9xSkCiez84lwVkRcjpAU0RKx3IzKy65qFxzvyNf68U9KM',
  email: 'avinash@example.com',
  location: 'Mumbai, Maharashtra',
  totalItems: 47,
  outfitsCreated: 12,
  boardsCount: 4,
};

// ========== FILTER CATEGORIES ==========
export const closetFilters = ['All', 'Indian Wear', 'Western Wear', 'Footwear', 'Accessories'];
export const builderFilters = ['ALL', 'TOP', 'BOTTOM', 'ETHNIC', 'ACCESSORIES'];
