import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    // @ts-ignore
    if (!prisma.review) {
       return NextResponse.json([])
    }

    const reviews = await prisma.review.findMany({
      where: {
        courseId: id,
      },
      include: {
        student: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error("[COURSE_REVIEWS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const cookieStore = await cookies()
    const sid = cookieStore.get("session")?.value
    const session = await getSession(sid)

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const json = await req.json()
    const { rating, comment } = json

    if (!rating || rating < 1 || rating > 5) {
      return new NextResponse("Invalid rating", { status: 400 })
    }

    // Check if user is enrolled
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId: session.userId,
          courseId: id,
        },
      },
    })

    if (!enrollment) {
      return new NextResponse("You must be enrolled to review this course", { status: 403 })
    }

    // Check if review already exists
    const existingReview = await prisma.review.findUnique({
      where: {
        studentId_courseId: {
          studentId: session.userId,
          courseId: id,
        },
      },
    })

    if (existingReview) {
      // Update existing review
      const review = await prisma.review.update({
        where: {
          id: existingReview.id,
        },
        data: {
          rating,
          comment,
        },
      })
      return NextResponse.json(review)
    }

    // Create new review
    const review = await prisma.review.create({
      data: {
        studentId: session.userId,
        courseId: id,
        rating,
        comment,
      },
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error("[COURSE_REVIEWS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
